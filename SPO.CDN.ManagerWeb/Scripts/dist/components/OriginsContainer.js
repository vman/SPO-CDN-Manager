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
var Button_1 = require("office-ui-fabric-react/lib/Button");
var OriginsContainer = (function (_super) {
    __extends(OriginsContainer, _super);
    function OriginsContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { showPanel: false };
        return _this;
    }
    OriginsContainer.prototype.render = function () {
        return React.createElement("div", { className: "o365Manager-OriginsContainer" },
            React.createElement(Button_1.PrimaryButton, { text: 'Add New Origin', onClick: function () { return alert('Clicked'); } }),
            React.createElement(Button_1.PrimaryButton, { text: 'Create Default Origins', onClick: function () { return alert('Clicked'); } }),
            React.createElement("ul", null, this.props.Origins.map(function (origin, index) {
                return React.createElement("li", { key: index }, origin);
            })));
    };
    return OriginsContainer;
}(React.Component));
exports.OriginsContainer = OriginsContainer;
//# sourceMappingURL=OriginsContainer.js.map