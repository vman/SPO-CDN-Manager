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

        private static string _graphResourceId = "https://graph.microsoft.com/";
        private static string _graphSPRootUri = "https://graph.microsoft.com/v1.0/sites/root?$select=webUrl";

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


        public static string GraphResourceId
        {
            get
            {
                return _graphResourceId;
            }
        }

        public static Uri GraphSPRootUri
        {
            get
            {
                return new Uri(_graphSPRootUri);
            }
        }
    }
}