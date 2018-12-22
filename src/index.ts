/**
 * Gettext module
 * @author zuojiazi@vip.qq.com
 */

import { I18nDirective } from './i18n/i18n.directive';
import { I18nModule } from './i18n/i18n.module';
import { I18nService } from './i18n/i18n.service';
import { Extractor } from './gettext/extractor';
import { Compile, DEFAULT_CTX } from './gettext/compile';

export { I18nDirective, I18nModule, I18nService, Extractor, Compile, DEFAULT_CTX };
