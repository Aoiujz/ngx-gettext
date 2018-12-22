"use strict";
/**
 * Gettext module
 * @author zuojiazi@vip.qq.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_directive_1 = require("./i18n/i18n.directive");
exports.I18nDirective = i18n_directive_1.I18nDirective;
const i18n_module_1 = require("./i18n/i18n.module");
exports.I18nModule = i18n_module_1.I18nModule;
const i18n_service_1 = require("./i18n/i18n.service");
exports.I18nService = i18n_service_1.I18nService;
const extractor_1 = require("./gettext/extractor");
exports.Extractor = extractor_1.Extractor;
const compiler_1 = require("./gettext/compiler");
exports.Compiler = compiler_1.Compiler;
exports.DEFAULT_CTX = compiler_1.DEFAULT_CTX;
