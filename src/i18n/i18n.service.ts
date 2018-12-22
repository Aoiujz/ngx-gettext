/**
 * I18n Service
 * @author zuojiazi@vip.qq.com
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { vsprintf } from 'sprintf-js';

const DEFAULT_CTX = '_@@DEFAULT_CTX@@_';

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

@Injectable()
export class I18nService {
    private current = 'en_US';
    private packages = new Map<string, I18n.Contexts>();

    readonly onLanguageChange = new BehaviorSubject<string>(this.current);

    get languages() {
        return this.packages.get(this.current) || {};
    }

    constructor() {
        this.changeLanguage(this.current);
    }

    get(key: string, args: any[] = [], context = DEFAULT_CTX) {
        const translated = this.getTranslated(key, context) || key;
        console.log(translated);
        return vsprintf(Array.isArray(translated) ? translated[0] : translated, args);
    }

    plural(n: number, key: string, plural: string, args: any[] = [], context = DEFAULT_CTX) {
        const index = n === 1 ? 0 : 1;
        const translated = this.getTranslated(key, context) || [key, plural];
        console.log(['plural', translated]);
        return vsprintf(Array.isArray(translated) ? translated[index] : translated, args);
    }

    async changeLanguage(lang: string) {
        if (lang === this.current && this.packages.has(lang)) {
            return;
        }

        try {
            await this.load(lang);
            this.current = lang;
            this.onLanguageChange.next(lang);
        } catch (e) {
            throw new Error('Change language failed.');
        }
    }

    private async load(lang: string) {
        if (this.packages.has(lang)) {
            return lang;
        } else {
            const response = await fetch(`/i18n/${lang}.json`);
            const data = await response.json() as I18n.Package;

            if (data.language !== lang) {
                throw new Error('The language pack was not found.');
            }

            this.packages.set(data.language, data.contexts);
            return lang;
        }
    }

    private getTranslated(key: string, ctx: string) {
        return this.languages[ctx] ? this.languages[ctx][key] : null;
    }
}
