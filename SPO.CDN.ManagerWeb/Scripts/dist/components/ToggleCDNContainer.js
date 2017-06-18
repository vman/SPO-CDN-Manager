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
var Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var ToggleCDNContainer = (function (_super) {
    __extends(ToggleCDNContainer, _super);
    function ToggleCDNContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleCDNContainer.prototype.render = function () {
        return React.createElement("div", { className: "o365Manager-ToggleCDNContainer" },
            React.createElement(Toggle_1.Toggle, { label: 'Use Office 365 Public CDN', onText: 'On', offText: 'Off', checked: this.props.Enabled, onChanged: this._showDialog.bind(this) }),
            React.createElement(Dialog_1.Dialog, { isOpen: this.state.showDialog, type: Dialog_1.DialogType.normal, onDismiss: this._closeDialog.bind(this), title: 'Change CDN Settings?', subText: 'Are you sure you want to change the CDN settings for your tenant?', isBlocking: true },
                React.createElement(Dialog_1.DialogFooter, null,
                    React.createElement(Button_1.DefaultButton, { onClick: this.props.onChanged.bind(this), text: 'Yes' }),
                    React.createElement(Button_1.DefaultButton, { onClick: this._closeDialog.bind(this), text: 'No' }))));
    };
    ToggleCDNContainer.prototype._showDialog = function () {
        this.setState({ showDialog: true });
    };
    ToggleCDNContainer.prototype._closeDialog = function () {
        this.setState({ showDialog: false });
    };
    return ToggleCDNContainer;
}(React.Component));
exports.ToggleCDNContainer = ToggleCDNContainer;
//# sourceMappingURL=ToggleCDNContainer.js.map