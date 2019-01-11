/**
 * I18n Directive
 * @author zuojiazi@vip.qq.com
 */

import { Directive, ElementRef, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService } from './i18n.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[translate],[translate-attr]',
})
export class I18nDirective implements OnInit, OnDestroy {
    @Input('translate-attr')
    private attr: string;

    // tslint:disable-next-line:no-input-rename
    @Input('translate-n')
    private n: number;

    // tslint:disable-next-line:no-input-rename
    @Input('translate-plural')
    private plural: string;

    // tslint:disable-next-line:no-input-rename
    @Input('translate-args')
    private args: any[];

    // tslint:disable-next-line:no-input-rename
    @Input('translate-context')
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

        if (this.n && !Number.isFinite(this.n)) {
            throw new Error('Attribute "translate-n" must be a number');
        }

        if (this.args && !Array.isArray(this.args)) {
            throw new Error('Attribute "translate-args" must be an array');
        }

        this.subscription = this.I18n.onLanguageChange.subscribe(() => {
            // console.log([msgid, this.n, this.plural, this.context, this.args]);
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
        if (this.attr) {
            return this.element.getAttribute(this.attr);
        } else {
            return this.element.textContent;
        }
    }

    private setContent(message: string) {
        if (this.attr) {
            this.element.setAttribute(this.attr, message);
        } else {
            this.element.textContent = message;
        }
    }
}
