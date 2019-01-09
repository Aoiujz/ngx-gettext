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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "rxjs", "sprintf-js", "../references"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var rxjs_1 = require("rxjs");
    var sprintf_js_1 = require("sprintf-js");
    var references_1 = require("../references");
    var I18nService = /** @class */ (function () {
        function I18nService() {
            this.current = 'en_US';
            this.packages = new Map();
            this.onLanguageChange = new rxjs_1.BehaviorSubject(this.current);
            this.changeLanguage(this.current);
        }
        Object.defineProperty(I18nService.prototype, "languages", {
            get: function () {
                return this.packages.get(this.current) || {};
            },
            enumerable: true,
            configurable: true
        });
        I18nService.prototype.get = function (key, args, context) {
            if (args === void 0) { args = []; }
            if (context === void 0) { context = references_1.DEFAULT_CTX; }
            var translated = this.getTranslated(key, context) || key;
            console.log(translated);
            return sprintf_js_1.vsprintf(Array.isArray(translated) ? translated[0] : translated, args);
        };
        I18nService.prototype.plural = function (n, key, plural, args, context) {
            if (args === void 0) { args = []; }
            if (context === void 0) { context = references_1.DEFAULT_CTX; }
            var index = n === 1 ? 0 : 1;
            var translated = this.getTranslated(key, context) || [key, plural];
            console.log(['plural', translated]);
            return sprintf_js_1.vsprintf(Array.isArray(translated) ? translated[index] : translated, args);
        };
        I18nService.prototype.changeLanguage = function (lang) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (lang === this.current && this.packages.has(lang)) {
                                return [2 /*return*/];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.load(lang)];
                        case 2:
                            _a.sent();
                            this.current = lang;
                            this.onLanguageChange.next(lang);
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            throw new Error('Change language failed.');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        I18nService.prototype.load = function (lang) {
            return __awaiter(this, void 0, void 0, function () {
                var response, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.packages.has(lang)) return [3 /*break*/, 1];
                            return [2 /*return*/, lang];
                        case 1: return [4 /*yield*/, fetch("/i18n/" + lang + ".json")];
                        case 2:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 3:
                            data = _a.sent();
                            if (data.language !== lang) {
                                throw new Error('The language pack was not found.');
                            }
                            this.packages.set(data.language, data.contexts);
                            return [2 /*return*/, lang];
                    }
                });
            });
        };
        I18nService.prototype.getTranslated = function (key, ctx) {
            return this.languages[ctx] ? this.languages[ctx][key] : null;
        };
        I18nService = __decorate([
            core_1.Injectable(),
            __metadata("design:paramtypes", [])
        ], I18nService);
        return I18nService;
    }());
    exports.I18nService = I18nService;
});
