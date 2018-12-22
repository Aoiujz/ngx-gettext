/**
 * Gettext reference
 * @author zuojiazi@vip.qq.com
 */

declare namespace I18n {
    interface Package {
        language: string;
        contexts: Contexts;
    }

    interface Contexts {
        [key: string]: Items;
    }

    interface Items {
        [key: string]: string | string[];
    }
}

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
