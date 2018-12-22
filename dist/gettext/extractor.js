"use strict";
/**
 * Extract multilingual strings
 * @author zuojiazi@vip.qq.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
const gettext_extractor_1 = require("gettext-extractor");
const path_1 = require("path");
class Extractor {
    constructor(options) {
        this.options = {
            attrs: [],
            cwd: null,
            filename: 'messages.pot',
            savePath: 'i18n',
            htmlGlob: '**/*.html',
            tsGlob: '**/*.ts',
        };
        if (options) {
            Object.assign(this.options, options);
        }
    }
    run() {
        const cwd = process.cwd();
        const extractor = new gettext_extractor_1.GettextExtractor();
        const attributes = {
            textPlural: 'translate-plural',
            context: 'translate-context',
        };
        if (this.options.cwd) {
            process.chdir(this.options.cwd);
        }
        const htmlextractors = [
            gettext_extractor_1.HtmlExtractors.elementContent('[translate]', { attributes }),
        ];
        for (const attr of this.options.attrs) {
            htmlextractors.push(gettext_extractor_1.HtmlExtractors.elementAttribute(`[translate=${attr}]`, attr, { attributes }));
        }
        const tsextractors = [
            gettext_extractor_1.JsExtractors.callExpression('[this].I18n.get', {
                arguments: {
                    text: 0,
                    context: 2,
                }
            }),
            gettext_extractor_1.JsExtractors.callExpression('[this].I18n.plural', {
                arguments: {
                    text: 1,
                    textPlural: 2,
                    context: 4,
                }
            }),
        ];
        extractor.createHtmlParser(htmlextractors).parseFilesGlob(this.options.htmlGlob);
        extractor.createJsParser(tsextractors).parseFilesGlob(this.options.tsGlob);
        extractor.savePotFile(path_1.join(this.options.savePath, this.options.filename));
        if (this.options.cwd) {
            process.chdir(cwd);
        }
        return extractor;
    }
}
exports.Extractor = Extractor;
