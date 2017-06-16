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
var Toggle_1 = require("office-ui-fabric-react/lib/Toggle");
var ToggleCDNContainer = (function (_super) {
    __extends(ToggleCDNContainer, _super);
    function ToggleCDNContainer(props) {
        return _super.call(this, props) || this;
    }
    ToggleCDNContainer.prototype.render = function () {
        return React.createElement("div", { className: "o365Manager-ToggleCDNContainer" },
            React.createElement(Toggle_1.Toggle, { label: 'Use Office 365 Public CDN', onText: 'On', offText: 'Off', checked: this.props.Enabled }));
    };
    return ToggleCDNContainer;
}(React.Component));
exports.ToggleCDNContainer = ToggleCDNContainer;
//# sourceMappingURL=ToggleCDNContainer.js.map