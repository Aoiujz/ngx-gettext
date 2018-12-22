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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const i18n_service_1 = require("./i18n.service");
let I18nDirective = class I18nDirective {
    constructor(element, I18n) {
        this.I18n = I18n;
        this.element = element.nativeElement;
    }
    ngOnInit() {
        const msgid = this.getMsgid();
        if (this.n && !Number.isFinite(this.n)) {
            throw new Error('Attribute "translate-n" must be a number');
        }
        if (this.args && !Array.isArray(this.args)) {
            throw new Error('Attribute "translate-args" must be an array');
        }
        this.subscription = this.I18n.onLanguageChange.subscribe(() => {
            console.log([msgid, this.n, this.plural, this.context, this.args]);
            if (this.n && this.plural) {
                this.setContent(this.I18n.plural(Number(this.n), msgid, this.plural, this.args || [], this.context));
            }
            else {
                this.setContent(this.I18n.get(msgid, this.args || [], this.context));
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    getMsgid() {
        if (this.attr) {
            return this.element.getAttribute(this.attr);
        }
        else {
            return this.element.textContent;
        }
    }
    setContent(message) {
        if (this.attr) {
            this.element.setAttribute(this.attr, message);
        }
        else {
            this.element.textContent = message;
        }
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
exports.I18nDirective = I18nDirective;
