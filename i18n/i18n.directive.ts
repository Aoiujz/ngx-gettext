/**
 * I18n Directive
 * @author zuojiazi@vip.qq.com
 */

import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
    selector: '[i18ns]',
})
export class I18nDirective implements OnInit {
    @Input()
    private i18ns: string;
    private msgid: string;

    private element: HTMLElement;

    constructor(
        element: ElementRef,
    ) {
        this.element = element.nativeElement as HTMLElement;
    }

    ngOnInit() {
        if (this.i18ns) {
            this.msgid = this.element.getAttribute(this.i18ns);
        } else {
            this.msgid = this.element.textContent;
        }

        console.log(this.element.textContent);
        console.log(this.element.innerText);
        console.log(this.element.innerHTML);

        console.log(this.msgid);
    }
}
