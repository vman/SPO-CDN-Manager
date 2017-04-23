using Microsoft.Online.SharePoint.TenantAdministration;
using Microsoft.Online.SharePoint.TenantManagement;
using Microsoft.SharePoint.Client;
using SPO.CDN.ManagerWeb.DTO;
using SPO.CDN.ManagerWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web.Mvc;

namespace SPO.CDN.ManagerWeb.Controllers
{
  public class HomeController : Controller
  {
    [Authorize]
    public ActionResult Index()
    {
      return View();
    }

    public ActionResult GetCDNSettings()
    {
      var cdnManagerModel = new CDNManagerModel();

      using (var clientContext = GetClientContext())
      {
        clientContext.Load(clientContext.Web, w => w.Url);

        var tenant = new Office365Tenant(clientContext);
        var publicCDNEnabled = tenant.GetTenantCdnEnabled(SPOTenantCdnType.Public);
        var publicCdnOrigins = tenant.GetTenantCdnOrigins(SPOTenantCdnType.Public);
        var publicCDNPolicies = tenant.GetTenantCdnPolicies(SPOTenantCdnType.Public);

        clientContext.ExecuteQuery();

        cdnManagerModel.PublicCDNEnabled = publicCDNEnabled.Value;
        cdnManagerModel.Origins = GetCDNOrigins(publicCdnOrigins);
        var fileTypes = publicCDNPolicies.Where(s => s.StartsWith(SPOTenantCdnPolicyType.IncludeFileExtensions.ToString())).First();
        cdnManagerModel.Filetypes = ConvertToList(fileTypes);
        cdnManagerModel.SPOSiteUrl = clientContext.Web.Url;

      }

      return Json(cdnManagerModel, JsonRequestBehavior.AllowGet);
    }

    [HttpPost]
    public ActionResult CreateDefaultOrigins()
    {

      try
      {
        IList<CDNOrigin> origins = new List<CDNOrigin>();

        using (var clientContext = GetClientContext())
        {
          var tenant = new Office365Tenant(clientContext);

          tenant.CreateTenantCdnDefaultOrigins(SPOTenantCdnType.Public);

          var publicCdnOrigins = tenant.GetTenantCdnOrigins(SPOTenantCdnType.Public);

          clientContext.ExecuteQuery();

          origins = GetCDNOrigins(publicCdnOrigins);
        }

        return Json(origins);
      }
      catch (Exception ex)
      {
        Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        return Json(ex.Message);
      }
    }

    [HttpPost]
    public ActionResult SetCDN(bool value)
    {
      bool CDNEnabled = false;

      try
      {
        using (var clientContext = GetClientContext())
        {
          var tenant = new Office365Tenant(clientContext);

          tenant.SetTenantCdnEnabled(SPOTenantCdnType.Public, value);

          var publicCDNEnabled = tenant.GetTenantCdnEnabled(SPOTenantCdnType.Public);

          clientContext.ExecuteQuery();

          CDNEnabled = publicCDNEnabled.Value;

          return Json(CDNEnabled);
        }
      }
      catch (Exception ex)
      {
        Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        return Json(ex.Message);
      }
    }

    [HttpPost]
    public ActionResult RemoveOrigin(string originURL)
    {
      try
      {
        IList<CDNOrigin> origins = new List<CDNOrigin>();

        using (var clientContext = GetClientContext())
        {
          var tenant = new Office365Tenant(clientContext);

          tenant.RemoveTenantCdnOrigin(SPOTenantCdnType.Public, originURL);

          var publicCdnOrigins = tenant.GetTenantCdnOrigins(SPOTenantCdnType.Public);

          clientContext.ExecuteQuery();

          origins = GetCDNOrigins(publicCdnOrigins);
        }

        return Json(origins);
      }
      catch (Exception ex)
      {
        Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        return Json(ex.Message);
      }
    }

    [HttpPost]
    public ActionResult AddOrigin(string folderUrl)
    {
      try
      {
        IList<CDNOrigin> origins = new List<CDNOrigin>();

        using (var clientContext = GetClientContext())
        {
          var tenant = new Office365Tenant(clientContext);

          tenant.AddTenantCdnOrigin(SPOTenantCdnType.Public, folderUrl);

          var publicCdnOrigins = tenant.GetTenantCdnOrigins(SPOTenantCdnType.Public);

          clientContext.ExecuteQuery();

          origins = GetCDNOrigins(publicCdnOrigins);
        }

        return Json(origins);
      }
      catch (Exception ex)
      {
        Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        return Json(ex.Message);
      }
    }


    [HttpPost]
    public ActionResult SetFiletypes(List<string> filetypes)
    {
      try
      {
        string cdnFileTypes;

        using (var clientContext = GetClientContext())
        {
          var tenant = new Office365Tenant(clientContext);

          var newFileTypes = string.Join(",", filetypes);

          tenant.SetTenantCdnPolicy(SPOTenantCdnType.Public, SPOTenantCdnPolicyType.IncludeFileExtensions, newFileTypes);

          var publicCDNPolicies = tenant.GetTenantCdnPolicies(SPOTenantCdnType.Public);

          clientContext.ExecuteQuery();

          cdnFileTypes = publicCDNPolicies.Where(s => s.StartsWith(SPOTenantCdnPolicyType.IncludeFileExtensions.ToString())).First();
        }

        return Json(ConvertToList(cdnFileTypes));
      }
      catch (Exception ex)
      {
        Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        return Json(ex.Message);
      }
    }

    private ClientContext GetClientContext()
    {
      var signInUserId = ClaimsPrincipal.Current.FindFirst(ClaimTypes.NameIdentifier).Value;


      var clientContext = CDNManagerContextProvider.GetWebApplicationClientContext(new RedisTokenCache(signInUserId));

      return clientContext;


    }

    private IList<CDNOrigin> GetCDNOrigins(IList<string> publicCdnOrigins)
    {
      var cdnOrigins = new List<CDNOrigin>();

      foreach (string origin in publicCdnOrigins)
      {
        var cdnOrigin = new CDNOrigin();
        cdnOrigin.Url = origin;

        cdnOrigins.Add(cdnOrigin);
      }

      return cdnOrigins;
    }

    private IList<string> ConvertToList(string publicCdnAllowedFileTypes)
    {
      var fileTypes = new List<string>();
      string commaSeperatedFileTypes = publicCdnAllowedFileTypes.Split(';')[1];
      if (!string.IsNullOrWhiteSpace(commaSeperatedFileTypes))
      {
        fileTypes = commaSeperatedFileTypes.Split(',').ToList();
      }
      return fileTypes;
    }
  }
}
