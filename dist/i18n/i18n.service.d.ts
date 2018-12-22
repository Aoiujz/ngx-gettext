import { BehaviorSubject } from 'rxjs';
export declare namespace I18n {
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
export declare class I18nService {
    private current;
    private packages;
    readonly onLanguageChange: BehaviorSubject<string>;
    readonly languages: I18n.Contexts;
    constructor();
    get(key: string, args?: any[], context?: string): string;
    plural(n: number, key: string, plural: string, args?: any[], context?: string): string;
    changeLanguage(lang: string): Promise<void>;
    private load(lang);
    private getTranslated(key, ctx);
}
