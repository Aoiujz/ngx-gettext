/**
 * Compile po to json
 * @author zuojiazi@vip.qq.com
 */

import { I18n } from '../references';
import * as PO from 'pofile';
import * as glob from 'glob';
import * as fs from 'fs';
import { join } from 'path';


export declare namespace Gettext {
    interface CompileOptions {
        sourcePath?: string;
        tragetPath?: string;
    }
}

export const DEFAULT_CTX = '_@@DEFAULT_CTX@@_';

export class Compiler {
    private options: Gettext.CompileOptions = {
        sourcePath: 'i18n',
        tragetPath: 'i18n',
    };

    constructor(options?: Gettext.CompileOptions) {
        if (options) {
            Object.assign(this.options, options);
        }
    }

    run() {
        const cwd = this.options.sourcePath;
        for(const filename of glob.sync('*.po', { cwd })) {
            console.log(filename);
            PO.load(filename, (error, po) => {
                const data = new Package(po.headers.Language, {});

                for (const item of po.items) {
                    const id = item.msgid;
                    const ctx = item.msgctxt || DEFAULT_CTX;

                    if (!data.contexts[ctx]) {
                        data.contexts[ctx] = {};
                    }

                    data.contexts[ctx][id] = item.msgstr.length === 1 ? item.msgstr[0] : item.msgstr;
                }

                fs.writeFileSync(join(this.options.tragetPath, filename.replace('.po', '.json')), JSON.stringify(data));
            });
        }
    }
}

class Package implements I18n.Package {
    constructor(
        public language: string,
        public contexts: I18n.Contexts,
    ) { }
}
