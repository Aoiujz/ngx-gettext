/**
 * I18n Directive
 * @author zuojiazi@vip.qq.com
 */
import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { I18nService } from './i18n.service';
export declare class I18nDirective implements OnInit, OnDestroy {
    private I18n;
    private translate;
    private n;
    private plural;
    private args;
    private context;
    private element;
    private subscription;
    constructor(element: ElementRef, I18n: I18nService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private getMsgid();
    private setContent(message);
}
