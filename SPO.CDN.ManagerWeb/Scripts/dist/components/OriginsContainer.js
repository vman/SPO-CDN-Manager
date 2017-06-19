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
var Label_1 = require("office-ui-fabric-react/lib/Label");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
var OriginsContainer = (function (_super) {
    __extends(OriginsContainer, _super);
    function OriginsContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showPanel: false
        };
        return _this;
    }
    OriginsContainer.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { className: 'o365Manager-OriginsContainer' },
            React.createElement(Button_1.PrimaryButton, { text: 'Add New Origin', onClick: this._showPanel.bind(this) }),
            React.createElement(Button_1.PrimaryButton, { text: 'Create Default Origins', onClick: function () { return alert('Clicked'); } }),
            React.createElement("ul", null, this.props.Origins.map(function (origin, index) {
                return React.createElement("li", { key: index }, origin);
            })),
            React.createElement(Panel_1.Panel, { isOpen: this.state.showPanel, onDismiss: function () { return _this.setState({ showPanel: false }); }, type: Panel_1.PanelType.largeFixed, isLightDismiss: true, headerText: 'Add New CDN Origin' },
                React.createElement(Label_1.Label, null, "Add the relative url of a SharePoint folder to be set as CDN Origin. Wildcards beginning with */ are also supported."),
                React.createElement(TextField_1.TextField, { label: 'Relative Url of Folder', placeholder: '/sites/intranet/publishingimages' }),
                React.createElement(Button_1.PrimaryButton, { text: 'Add' /*onClick={this._showPanel.bind(this)}*/ }),
                React.createElement(MessageBar_1.MessageBar, null, "It can take up to 15 minutes for the CDN origin to be available for publishing assets")));
    };
    OriginsContainer.prototype._showPanel = function () {
        this.setState({
            showPanel: true
        });
    };
    return OriginsContainer;
}(React.Component));
exports.OriginsContainer = OriginsContainer;
//# sourceMappingURL=OriginsContainer.js.map