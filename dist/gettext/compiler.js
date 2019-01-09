/**
 * Compile po to json
 * @author zuojiazi@vip.qq.com
 */
import * as PO from 'pofile';
import * as glob from 'glob';
import * as fs from 'fs';
import { join } from 'path';
import { DEFAULT_CTX } from '../references';
export class Compiler {
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
            PO.load(join(cwd, filename), (error, po) => {
                const data = new Package(po.headers.Language, {});
                for (const item of po.items) {
                    const id = item.msgid;
                    const ctx = item.msgctxt || DEFAULT_CTX;
                    if (item.msgstr[0].length > 0 && !item.flags.fuzzy) {
                        if (!data.contexts[ctx]) {
                            data.contexts[ctx] = {};
                        }
                        data.contexts[ctx][id] = item.msgstr.length === 1 ? item.msgstr[0] : item.msgstr;
                    }
                }
                fs.writeFileSync(join(this.options.tragetPath, filename.replace('.po', '.json')), JSON.stringify(data));
            });
        }
    }
}
class Package {
    constructor(language, contexts) {
        this.language = language;
        this.contexts = contexts;
    }
}
