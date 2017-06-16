"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var Header = (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        return _super.call(this, props) || this;
    }
    Header.prototype.render = function () {
        return React.createElement("div", { className: "o365Manager-Header" },
            React.createElement(office_ui_fabric_react_1.Label, null,
                "Manage Office 365 Public CDN settings for ",
                this.props.SPOSiteUrl));
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=Header.js.map