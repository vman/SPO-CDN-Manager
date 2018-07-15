using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Owin;
using SPO.CDN.ManagerWeb.Helpers;
using SPO.CDN.ManagerWeb.Models;
using System;
using System.IdentityModel.Claims;
using System.Threading.Tasks;
using System.Web;

[assembly: OwinStartup(typeof(SPO.CDN.ManagerWeb.Startup))]

namespace SPO.CDN.ManagerWeb
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {

            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            //app.UseCookieAuthentication(new CookieAuthenticationOptions {
            //    CookieManager = new Components.SystemWebCookieManager()
            //});

            app.UseOpenIdConnectAuthentication(
                new OpenIdConnectAuthenticationOptions
                {
                    ClientId = SettingsHelper.ClientId,
                    Authority = SettingsHelper.AADInstance + "common",
                    TokenValidationParameters = new System.IdentityModel.Tokens.TokenValidationParameters
                    {
                        // instead of using the default validation (validating against a single issuer value, as we do in line of business apps), 
                        // we inject our own multitenant validation logic
                        ValidateIssuer = false,
                    },
                    Notifications = new OpenIdConnectAuthenticationNotifications()
                    {
                        SecurityTokenValidated = (context) =>
                        {
                            return Task.FromResult(0);
                        },
                        AuthorizationCodeReceived = (context) =>
                        {
                            var code = context.Code;

                            ClientCredential credential = new ClientCredential(
                                SettingsHelper.ClientId,
                                SettingsHelper.ClientSecret);
                            string signedInUserID = context.AuthenticationTicket.Identity.FindFirst(
                                ClaimTypes.NameIdentifier).Value;
                            string tenantId = context.AuthenticationTicket.Identity.FindFirst(
                                "http://schemas.microsoft.com/identity/claims/tenantid").Value;

                            AuthenticationContext authContext = new AuthenticationContext(
                                SettingsHelper.AADInstance + tenantId,
                                new SessionADALCache(signedInUserID));
                            AuthenticationResult result = authContext.AcquireTokenByAuthorizationCode(
                                code, new Uri(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Path)),
                                credential, SettingsHelper.MicrosoftGraphResourceId);

                            return Task.FromResult(0);
                        },
                        AuthenticationFailed = (context) =>
                        {
                            context.OwinContext.Response.Redirect("/Home/Error?message=" + context.Exception.Message);
                            context.HandleResponse(); // Suppress the exception
                            return Task.FromResult(0);
                        }
                    }
                });

        }
    }
}
