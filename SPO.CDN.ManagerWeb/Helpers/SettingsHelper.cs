using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SPO.CDN.ManagerWeb.Helpers
{
    public static class SettingsHelper
    {
        private static String _clientId = ConfigurationManager.AppSettings["ida:ClientId"];
        private static String _clientSecret = ConfigurationManager.AppSettings["ida:ClientSecret"];
        private static String _aadInstance = ConfigurationManager.AppSettings["ida:AADInstance"];
        public static String MicrosoftGraphResourceId = "https://graph.microsoft.com"; //https://vrdmn.sharepoint.com
        public static String Authority = "https://login.microsoftonline.com/common/";
        public static string AuthorizationUri = "https://login.microsoftonline.com/";

        private static string _discoverySvcResourceId = "https://api.office.com/discovery/";
        private static string _discoverySvcEndpointUri = "https://api.office.com/discovery/v2.0/me/services?$select=capability,serviceResourceId&$filter=capability eq 'RootSite'";

        public static String ClientId
        {
            get
            {
                return (_clientId);
            }
        }

        /// <summary>
        /// Provides the Azure AD Client Secret
        /// </summary>
        public static String ClientSecret
        {
            get
            {
                return (_clientSecret);
            }
        }

        /// <summary>
        /// Provides the Azure AD Instance URL
        /// </summary>
        public static String AADInstance
        {
            get
            {
                return (_aadInstance);
            }
        }


        public static string DiscoveryServiceResourceId
        {
            get
            {
                return _discoverySvcResourceId;
            }
        }

        public static Uri DiscoveryServiceEndpointUri
        {
            get
            {
                return new Uri(_discoverySvcEndpointUri);
            }
        }
    }
}