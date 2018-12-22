"use strict";
/**
 * I18n Directive
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
var I18nDirective = /** @class */ (function () {
    function I18nDirective(element, I18n) {
        this.I18n = I18n;
        this.element = element.nativeElement;
    }
    I18nDirective.prototype.ngOnInit = function () {
        var _this = this;
        var msgid = this.getMsgid();
        if (this.n && !Number.isFinite(this.n)) {
            throw new Error('Attribute "translate-n" must be a number');
        }
        if (this.args && !Array.isArray(this.args)) {
            throw new Error('Attribute "translate-args" must be an array');
        }
        this.subscription = this.I18n.onLanguageChange.subscribe(function () {
            console.log([msgid, _this.n, _this.plural, _this.context, _this.args]);
            if (_this.n && _this.plural) {
                _this.setContent(_this.I18n.plural(Number(_this.n), msgid, _this.plural, _this.args || [], _this.context));
            }
            else {
                _this.setContent(_this.I18n.get(msgid, _this.args || [], _this.context));
            }
        });
    };
    I18nDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    I18nDirective.prototype.getMsgid = function () {
        if (this.translate) {
            return this.element.getAttribute(this.translate);
        }
        else {
            return this.element.textContent;
        }
    };
    I18nDirective.prototype.setContent = function (message) {
        if (this.translate) {
            this.element.setAttribute(this.translate, message);
        }
        else {
            this.element.textContent = message;
        }
    };
    __decorate([
        core_1.Input()
    ], I18nDirective.prototype, "translate");
    __decorate([
        core_1.Input('translate-n')
    ], I18nDirective.prototype, "n");
    __decorate([
        core_1.Input('translate-plural')
    ], I18nDirective.prototype, "plural");
    __decorate([
        core_1.Input('translate-args')
    ], I18nDirective.prototype, "args");
    __decorate([
        core_1.Input('translate-context')
    ], I18nDirective.prototype, "context");
    I18nDirective = __decorate([
        core_1.Directive({
            selector: '[translate]'
        })
    ], I18nDirective);
    return I18nDirective;
}());
exports.I18nDirective = I18nDirective;
