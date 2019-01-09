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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "./i18n.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var i18n_service_1 = require("./i18n.service");
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
            if (this.attr) {
                return this.element.getAttribute(this.attr);
            }
            else {
                return this.element.textContent;
            }
        };
        I18nDirective.prototype.setContent = function (message) {
            if (this.attr) {
                this.element.setAttribute(this.attr, message);
            }
            else {
                this.element.textContent = message;
            }
        };
        __decorate([
            core_1.Input('translate-attr'),
            __metadata("design:type", String)
        ], I18nDirective.prototype, "attr", void 0);
        __decorate([
            core_1.Input('translate-n'),
            __metadata("design:type", Number)
        ], I18nDirective.prototype, "n", void 0);
        __decorate([
            core_1.Input('translate-plural'),
            __metadata("design:type", String)
        ], I18nDirective.prototype, "plural", void 0);
        __decorate([
            core_1.Input('translate-args'),
            __metadata("design:type", Array)
        ], I18nDirective.prototype, "args", void 0);
        __decorate([
            core_1.Input('translate-context'),
            __metadata("design:type", String)
        ], I18nDirective.prototype, "context", void 0);
        I18nDirective = __decorate([
            core_1.Directive({
                selector: '[translate],[translate-attr]',
            }),
            __metadata("design:paramtypes", [core_1.ElementRef,
                i18n_service_1.I18nService])
        ], I18nDirective);
        return I18nDirective;
    }());
    exports.I18nDirective = I18nDirective;
});
