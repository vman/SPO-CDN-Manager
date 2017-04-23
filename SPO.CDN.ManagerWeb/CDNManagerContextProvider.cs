using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.SharePoint.Client;
using SPO.CDN.ManagerWeb.Helpers;
using System;
using System.IO;
using System.Net;
using System.Security.Claims;
using System.Web.Script.Serialization;

namespace SPO.CDN.ManagerWeb
{
  public static class CDNManagerContextProvider
    {
        public static string GetSharePointResourceID(TokenCache tokenCache)
        {
            var accessToken = GetTokenForApplication(SettingsHelper.DiscoveryServiceResourceId, tokenCache);

            var request = HttpWebRequest.CreateHttp(SettingsHelper.DiscoveryServiceEndpointUri);
            request.Method = "GET";
            request.Headers["Authorization"] = "Bearer " + accessToken;

            string spResourceID = string.Empty;

            using (var response = request.GetResponse() as HttpWebResponse)
            {
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    var obj = js.Deserialize<dynamic>(reader.ReadToEnd());

                    foreach (var o in obj["value"][0])
                    {
                        if (o.Key == "serviceResourceId")
                        {
                            spResourceID = o.Value;
                            break;
                        }
                    }
                }
            }

            return spResourceID;
        }

        public static ClientContext GetWebApplicationClientContext(TokenCache tokenCache)
        {
            string siteUrl = GetSharePointResourceID(tokenCache);

            OfficeDevPnP.Core.AuthenticationManager authManager = new OfficeDevPnP.Core.AuthenticationManager();
            ClientContext context = authManager.GetAzureADWebApplicationAuthenticatedContext(
                siteUrl,
                (s) => GetTokenForApplication(s, tokenCache));

            return (context);
        }

        private static String GetTokenForApplication(String serviceUri, TokenCache tokenCache)
        {
            string tenantID = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/tenantid").Value;
            string userObjectID = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;

            // Get a token for the Graph without triggering any user interaction (from the cache, via multi-resource refresh token, etc)
            ClientCredential clientcred = new ClientCredential(
                SettingsHelper.ClientId,
                SettingsHelper.ClientSecret);

            // Initialize AuthenticationContext with the token cache of the currently signed in user, as kept in the app's database
            AuthenticationContext authenticationContext = new AuthenticationContext(SettingsHelper.AADInstance + tenantID, tokenCache);

            // Get the Access Token
            AuthenticationResult authenticationResult = authenticationContext.AcquireTokenSilent(
                serviceUri.ToString(),
                clientcred,
                new UserIdentifier(userObjectID, UserIdentifierType.UniqueId));

            return authenticationResult.AccessToken;
        }
    }
}