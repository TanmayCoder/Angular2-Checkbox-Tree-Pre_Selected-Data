"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="./../typings/globals/core-js/index.d.ts"/>
var core_1 = require("@angular/core");
var nodeService_1 = require("./nodeService");
var Ptree2Component = (function () {
    function Ptree2Component(nodeService) {
        var _this = this;
        this.nodeService = nodeService;
        this.nodeService.getFiles().then(function (files) { return _this.filesTree4 = files; });
        this.nodeService.getSelectedNodes().then(function (files) { return _this.selectedNodes = files; });
    }
    Ptree2Component.prototype.ngOnInit = function () {
    };
    return Ptree2Component;
}());
Ptree2Component = __decorate([
    core_1.Component({
        selector: 'my-ptree2',
        templateUrl: 'app/ptree2.component.html'
    }),
    __metadata("design:paramtypes", [nodeService_1.NodeService])
], Ptree2Component);
exports.Ptree2Component = Ptree2Component;
//# sourceMappingURL=ptree2.component.js.map