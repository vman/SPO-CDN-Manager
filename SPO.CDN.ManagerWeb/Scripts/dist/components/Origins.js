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
var Origins = (function (_super) {
    __extends(Origins, _super);
    function Origins(props) {
        return _super.call(this, props) || this;
    }
    Origins.prototype.render = function () {
        console.log(this.props);
        return React.createElement("div", { className: "o365Manager-Origins" },
            React.createElement("ul", null, this.props.Origins.map(function (origin) {
                return React.createElement("li", { key: origin.toString(), value: origin });
            })));
    };
    return Origins;
}(React.Component));
exports.Origins = Origins;
//# sourceMappingURL=Origins.js.map