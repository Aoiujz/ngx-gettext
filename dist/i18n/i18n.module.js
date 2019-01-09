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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nDirective } from './i18n.directive';
import { I18nService } from './i18n.service';
let I18nModule = class I18nModule {
};
I18nModule = __decorate([
    NgModule({
        imports: [CommonModule],
        providers: [I18nService],
        declarations: [I18nDirective],
        exports: [I18nDirective],
    })
], I18nModule);
export { I18nModule };
