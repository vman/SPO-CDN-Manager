using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SPO.CDN.ManagerWeb.DTO
{
    public class CDNManagerModel
    {
        public bool PublicCDNEnabled { get; set; }
        public IList<string> Filetypes { get; set; }
        public IList<CDNOrigin> Origins { get; set; }
    }
}