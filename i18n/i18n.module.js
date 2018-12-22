"use strict";
/**
 * I18n Module
 * @author zuojiazi@vip.qq.com
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var i18n_directive_1 = require("./i18n.directive");
var i18n_service_1 = require("./i18n.service");
var I18nModule = /** @class */ (function () {
    function I18nModule() {
    }
    I18nModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            providers: [i18n_service_1.I18nService],
            declarations: [i18n_directive_1.I18nDirective],
            exports: [i18n_directive_1.I18nDirective]
        })
    ], I18nModule);
    return I18nModule;
}());
exports.I18nModule = I18nModule;
