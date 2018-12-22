/**
 * I18n Module
 * @author zuojiazi@vip.qq.com
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nDirective } from './i18n.directive';
import { I18nService } from './i18n.service';

@NgModule({
    imports: [CommonModule],
    providers: [I18nService],
    declarations: [I18nDirective],
    exports: [I18nDirective],
})
export class I18nModule { }
