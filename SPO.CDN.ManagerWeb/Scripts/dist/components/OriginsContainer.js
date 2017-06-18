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
var OriginsContainer = (function (_super) {
    __extends(OriginsContainer, _super);
    function OriginsContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OriginsContainer.prototype.render = function () {
        var origins = this.props.Origins;
        return (React.createElement("ul", null, origins.map(function (origin, index) {
            return React.createElement("li", { key: index }, origin);
        })));
    };
    return OriginsContainer;
}(React.Component));
exports.OriginsContainer = OriginsContainer;
//# sourceMappingURL=OriginsContainer.js.map