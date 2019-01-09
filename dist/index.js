/**
 * Gettext module
 * @author zuojiazi@vip.qq.com
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./i18n/i18n.directive", "./i18n/i18n.module", "./i18n/i18n.service", "./gettext/extractor", "./gettext/compiler"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var i18n_directive_1 = require("./i18n/i18n.directive");
    exports.I18nDirective = i18n_directive_1.I18nDirective;
    var i18n_module_1 = require("./i18n/i18n.module");
    exports.I18nModule = i18n_module_1.I18nModule;
    var i18n_service_1 = require("./i18n/i18n.service");
    exports.I18nService = i18n_service_1.I18nService;
    var extractor_1 = require("./gettext/extractor");
    exports.Extractor = extractor_1.Extractor;
    var compiler_1 = require("./gettext/compiler");
    exports.Compiler = compiler_1.Compiler;
});
