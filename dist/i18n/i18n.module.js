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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const i18n_directive_1 = require("./i18n.directive");
const i18n_service_1 = require("./i18n.service");
let I18nModule = class I18nModule {
};
I18nModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        providers: [i18n_service_1.I18nService],
        declarations: [i18n_directive_1.I18nDirective],
        exports: [i18n_directive_1.I18nDirective],
    })
], I18nModule);
exports.I18nModule = I18nModule;
