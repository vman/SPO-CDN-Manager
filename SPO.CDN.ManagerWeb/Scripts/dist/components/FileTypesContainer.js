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
var FileTypesContainer = (function (_super) {
    __extends(FileTypesContainer, _super);
    function FileTypesContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileTypesContainer.prototype.render = function () {
        return React.createElement("div", { className: "o365Manager-FileTypesContainer" },
            React.createElement("ul", null, this.props.FileTypes.map(function (filetype, index) {
                return React.createElement("li", { key: index }, filetype);
            })));
    };
    return FileTypesContainer;
}(React.Component));
exports.FileTypesContainer = FileTypesContainer;
//# sourceMappingURL=FileTypesContainer.js.map