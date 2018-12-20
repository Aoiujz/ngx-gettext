/**
 * I18n Service
 * @author zuojiazi@vip.qq.com
 */

/// <reference path="i18n.d.ts" />

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { vsprintf } from 'sprintf-js';

const DEFAULT_CTX = '_@@DEFAULT_CTX@@_';

@Injectable()
export class I18nService {
    private current = 'en_US';
    private packages = new Map<string, I18n.Contexts>();

    readonly onLanguageChange = new BehaviorSubject<string>(this.current);

    get languages() {
        return this.packages.get(this.current);
    }

    constructor() {
        this.changeLanguage(this.current);
    }

    get(key: string, args: any[] = [], context = DEFAULT_CTX) {
        const messages = this.languages[context] ? this.languages[context][key] : key;

        return vsprintf(Array.isArray(messages) ? messages[0] : messages, args);
    }

    plural(n: number, key: string, plural: string, args: any[], context = DEFAULT_CTX) {
        const index = n === 1 ? 0 : 1;
        const messages = this.languages[context] ? this.languages[context][key] : key;

        return vsprintf(Array.isArray(messages) ? messages[index] : messages, args);
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
}
