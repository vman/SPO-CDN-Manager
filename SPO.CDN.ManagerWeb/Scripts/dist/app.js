"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var Office365CDNManager_1 = require("./components/Office365CDNManager");
//const o365cdnProps: IOffice365Cdn = { Type: CdnType.Public, Enabled: true,  };
var o365ManagerElement = React.createElement(Office365CDNManager_1.Office365CDNManager);
ReactDOM.render(o365ManagerElement, document.getElementById("cdnManagerContainer"));
//# sourceMappingURL=app.js.map