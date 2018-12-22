"use strict";
/**
 * Compile po to json
 * @author zuojiazi@vip.qq.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
const PO = require("pofile");
const glob = require("glob");
const fs = require("fs");
const path_1 = require("path");
exports.DEFAULT_CTX = '_@@DEFAULT_CTX@@_';
class Compiler {
    constructor(options) {
        this.options = {
            sourcePath: 'i18n',
            tragetPath: 'i18n',
        };
        if (options) {
            Object.assign(this.options, options);
        }
    }
    run() {
        const cwd = this.options.sourcePath;
        if (!fs.existsSync(this.options.tragetPath)) {
            fs.mkdirSync(this.options.tragetPath);
        }
        for (const filename of glob.sync('*.po', { cwd })) {
            PO.load(path_1.join(cwd, filename), (error, po) => {
                const data = new Package(po.headers.Language, {});
                for (const item of po.items) {
                    const id = item.msgid;
                    const ctx = item.msgctxt || exports.DEFAULT_CTX;
                    if (item.msgstr[0].length > 0 && !item.flags.fuzzy) {
                        if (!data.contexts[ctx]) {
                            data.contexts[ctx] = {};
                        }
                        data.contexts[ctx][id] = item.msgstr.length === 1 ? item.msgstr[0] : item.msgstr;
                    }
                }
                fs.writeFileSync(path_1.join(this.options.tragetPath, filename.replace('.po', '.json')), JSON.stringify(data));
            });
        }
    }
}
exports.Compiler = Compiler;
class Package {
    constructor(language, contexts) {
        this.language = language;
        this.contexts = contexts;
    }
}
