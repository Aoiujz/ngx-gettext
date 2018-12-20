/**
 * I18n Directive
 * @author zuojiazi@vip.qq.com
 */

import { Directive, ElementRef, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService } from './i18n.service';

@Directive({
    selector: '[i18naaa]',
})
export class I18nDirective implements OnInit, OnDestroy {
    @Input()
    private i18n: string;

    @Input('i18n-n')
    private n: number;

    @Input('i18n-plural')
    private plural: string;

    @Input('i18n-args')
    private args: any[];

    @Input('i18n-context')
    private context: string;

    private element: HTMLElement;
    private subscription: Subscription;

    constructor(
        element: ElementRef,
        private I18n: I18nService,
    ) {
        this.element = element.nativeElement as HTMLElement;
    }

    ngOnInit() {
        const msgid = this.getMsgid();

        console.log(this.n);

        if (this.n && !Number.isFinite(this.n)) {
            throw new Error('Attribute "i18n-n" must be a number');
        }

        if (this.args && !Array.isArray(this.args)) {
            throw new Error('Attribute "i18n-args" must be an array');
        }

        this.subscription = this.I18n.onLanguageChange.subscribe(() => {
            console.log([msgid, this.n, this.plural, this.context, this.args]);
            if (this.n && this.plural) {
                this.setContent(this.I18n.plural(Number(this.n), msgid, this.plural, this.args || [], this.context));
            } else {
                this.setContent(this.I18n.get(msgid, this.args || [], this.context));
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private getMsgid() {
        if (this.i18n) {
            return this.element.getAttribute(this.i18n);
        } else {
            return this.element.textContent;
        }
    }

    private setContent(message: string) {
        if (this.i18n) {
            this.element.setAttribute(this.i18n, message);
        } else {
            this.element.textContent = message;
        }
    }
}
