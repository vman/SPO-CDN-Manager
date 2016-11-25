using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Configuration;
using System.Diagnostics;
using System.Web.Security;

namespace SPO.CDN.ManagerWeb.Models
{
    public class RedisTokenCache : TokenCache
    {
        private string userId;
        private UserTokenCacheItem Cache;

        public RedisTokenCache(string signedInUserId)
        {
            // associate the cache to the current user of the web app
            userId = signedInUserId;
            this.AfterAccess = AfterAccessNotification;
            this.BeforeAccess = BeforeAccessNotification;
            this.BeforeWrite = BeforeWriteNotification;
            // look up the entry in the cache
            var cache = Redis.Connection.GetDatabase();
            try
            {
                var cachedItem = cache.StringGet(userId);
                if (cachedItem.HasValue)
                {
                    Cache = JsonConvert.DeserializeObject<UserTokenCacheItem>(cachedItem);
                    this.Deserialize((Cache == null) ? null : MachineKey.Unprotect(Cache.cacheBits, "ADALCache"));
                }
            }
            catch (Exception ex)
            {
                Trace.WriteLine("Exception in RedisTokenCache(id): " + ex.Message);
                Cache = null;
            }
        }

        // clean up the database
        public override void Clear()
        {
            base.Clear();
            try
            {
                var cache = Redis.Connection.GetDatabase();
                cache.KeyDelete(userId);
            }
            catch (Exception ex)
            {
                Trace.WriteLine("Exception in RedisTokenCache.Clear: " + ex.Message);
            }
        }

        // Notification raised before ADAL accesses the cache.
        // This is your chance to update the in-memory copy from the cache, if the in-memory version is stale
        void BeforeAccessNotification(TokenCacheNotificationArgs args)
        {
            try
            {
                var cache = Redis.Connection.GetDatabase();
                var cachedItem = cache.StringGet(userId);
                if (cachedItem.HasValue)
                {
                    var status = JsonConvert.DeserializeObject<UserTokenCacheItem>(cachedItem);
                    if ((Cache != null) && (status.LastWrite > Cache.LastWrite))
                    {
                        Cache = status;
                        this.Deserialize((Cache == null) ? null : MachineKey.Unprotect(Cache.cacheBits, "ADALCache"));
                    }
                }
            }
            catch (Exception ex)
            {
                Trace.WriteLine("Exception in RedisTokenCache.BeforeAccessNotification: " + ex.Message);
            }
        }

        // Notification raised after ADAL accessed the cache.
        // If the HasStateChanged flag is set, ADAL changed the content of the cache
        void AfterAccessNotification(TokenCacheNotificationArgs args)
        {
            // if state changed
            if (this.HasStateChanged)
            {
                Cache = new UserTokenCacheItem
                {
                    cacheBits = MachineKey.Protect(this.Serialize(), "ADALCache"),
                    LastWrite = DateTime.Now
                };
                try
                {
                    var cache = Redis.Connection.GetDatabase();
                    var cacheItemJson = JsonConvert.SerializeObject(Cache);
                    cache.StringSet(userId, cacheItemJson, TimeSpan.FromDays(1)); // could we use token expiry somehow?
                }
                catch (Exception ex)
                {
                    Trace.WriteLine("Exception in RedisTokenCache.AfterAccessNotification: " + ex.Message);
                }
                this.HasStateChanged = false;
            }
        }
        void BeforeWriteNotification(TokenCacheNotificationArgs args)
        {
            // if you want to ensure that no concurrent write take place, use this notification to place a lock on the entry
        }

        public override void DeleteItem(TokenCacheItem item)
        {
            base.DeleteItem(item);
            try
            {
                var cache = Redis.Connection.GetDatabase();
                var cachedItem = cache.KeyDelete(userId);
            }
            catch (Exception ex)
            {
                Trace.WriteLine("Exception in RedisTokenCache.DeleteItem: " + ex.Message);
            }
        }
    }

    public class Redis
    {
        // Redis Connection string info
        private static Lazy<ConnectionMultiplexer> lazyConnection = new Lazy<ConnectionMultiplexer>(() =>
        {
            string cacheConnection = ConfigurationManager.AppSettings["ida:CacheConnection"].ToString();
            return ConnectionMultiplexer.Connect(cacheConnection);
        });

        public static ConnectionMultiplexer Connection
        {
            get
            {
                return lazyConnection.Value;
            }
        }
    }
    public class UserTokenCacheItem
    {
        public byte[] cacheBits { get; set; }
        public DateTime LastWrite { get; set; }
    }

}