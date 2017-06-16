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
require("./O365CDNManager.module.scss");
var List_1 = require("office-ui-fabric-react/lib/List");
var OriginsContainer = (function (_super) {
    __extends(OriginsContainer, _super);
    function OriginsContainer(props) {
        return _super.call(this, props) || this;
    }
    OriginsContainer.prototype.render = function () {
        return React.createElement("div", { className: "o365Manager-OriginsContainer" },
            React.createElement(List_1.List, { items: this.props.Origins, onRenderCell: function (origin, index) { return (React.createElement("li", null, origin)); } }));
    };
    return OriginsContainer;
}(React.Component));
exports.OriginsContainer = OriginsContainer;
//# sourceMappingURL=OriginsContainer.js.map