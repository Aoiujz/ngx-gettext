/**
 * Gettext reference
 * @author zuojiazi@vip.qq.com
 */

declare namespace Gettext {
    interface ExtractorOptions {
        attrs?: string[];
        cwd?: string;
        filename?: string;
        savePath?: string;
        htmlGlob?: string;
        tsGlob?: string;
    }
}
