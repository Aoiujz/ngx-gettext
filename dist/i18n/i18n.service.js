"use strict";
/**
 * I18n Service
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const sprintf_js_1 = require("sprintf-js");
const DEFAULT_CTX = '_@@DEFAULT_CTX@@_';
let I18nService = class I18nService {
    constructor() {
        this.current = 'en_US';
        this.packages = new Map();
        this.onLanguageChange = new rxjs_1.BehaviorSubject(this.current);
        this.changeLanguage(this.current);
    }
    get languages() {
        return this.packages.get(this.current) || {};
    }
    get(key, args = [], context = DEFAULT_CTX) {
        const translated = this.getTranslated(key, context) || key;
        console.log(translated);
        return sprintf_js_1.vsprintf(Array.isArray(translated) ? translated[0] : translated, args);
    }
    plural(n, key, plural, args = [], context = DEFAULT_CTX) {
        const index = n === 1 ? 0 : 1;
        const translated = this.getTranslated(key, context) || [key, plural];
        console.log(['plural', translated]);
        return sprintf_js_1.vsprintf(Array.isArray(translated) ? translated[index] : translated, args);
    }
    changeLanguage(lang) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lang === this.current && this.packages.has(lang)) {
                return;
            }
            try {
                yield this.load(lang);
                this.current = lang;
                this.onLanguageChange.next(lang);
            }
            catch (e) {
                throw new Error('Change language failed.');
            }
        });
    }
    load(lang) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.packages.has(lang)) {
                return lang;
            }
            else {
                const response = yield fetch(`/i18n/${lang}.json`);
                const data = yield response.json();
                if (data.language !== lang) {
                    throw new Error('The language pack was not found.');
                }
                this.packages.set(data.language, data.contexts);
                return lang;
            }
        });
    }
    getTranslated(key, ctx) {
        return this.languages[ctx] ? this.languages[ctx][key] : null;
    }
};
I18nService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], I18nService);
exports.I18nService = I18nService;
