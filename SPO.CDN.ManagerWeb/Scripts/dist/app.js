"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var Office365CDNManager_1 = require("./components/Office365CDNManager");
var Office365Cdn_1 = require("./dto/Office365Cdn");
var o365cdnProps = { Type: Office365Cdn_1.CdnType.Public, Enabled: true, };
var o365ManagerElement = React.createElement(Office365CDNManager_1.Office365CDNManager, o365cdnProps);
ReactDOM.render(o365ManagerElement, document.getElementById("cdnManagerContainer"));
//# sourceMappingURL=app.js.map