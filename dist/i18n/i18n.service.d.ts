import { BehaviorSubject } from 'rxjs';
import { I18n } from '../references';
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
