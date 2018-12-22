/**
 * Extract multilingual strings
 * @author zuojiazi@vip.qq.com
 */
import { GettextExtractor } from 'gettext-extractor';
export declare namespace Gettext {
    interface ExtractorOptions {
        attrs?: string[];
        cwd?: string;
        filename?: string;
        savePath?: string;
        htmlGlob?: string;
        tsGlob?: string;
    }
}
export declare class Extractor {
    private options;
    constructor(options?: Gettext.ExtractorOptions);
    run(): GettextExtractor;
}
