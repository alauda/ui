import { NgModule } from '@angular/core';

import { I18nPipe } from './i18n.pipe';

@NgModule({
  imports: [I18nPipe],
  exports: [I18nPipe],
})
export class I18nModule {}
