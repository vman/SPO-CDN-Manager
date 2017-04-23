using System.Web;
using System.Web.Optimization;

namespace SPO.CDN.ManagerWeb
{
  public class BundleConfig
  {
    // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
    public static void RegisterBundles(BundleCollection bundles)
    {
      bundles.Add(new ScriptBundle("~/bundles/libs").Include(
                  "~/Scripts/jquery-3.1.1.min.js",
                  "~/Scripts/knockout-3.4.0.js"));

      bundles.Add(new ScriptBundle("~/bundles/fabric").Include(
                "~/Scripts/fabric.min.js"));

      bundles.Add(new ScriptBundle("~/bundles/cdnmanager").Include(
                "~/Scripts/CDNManager.js"));

      //bundles.Add(new ScriptBundle("~/bundles/spcontext").Include(
      //            "~/Scripts/spcontext.js"));

      bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/fabric.min.css",
                "~/Content/fabric.components.min.css",
                "~/Content/site.css"));

      BundleTable.EnableOptimizations = true;
    }
  }
}
