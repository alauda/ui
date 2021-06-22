import { Pipe, PipeTransform } from '@angular/core';

import { I18nService } from './i18n.service';
import { StringMap } from './i18n.type';

@Pipe({
  name: 'auiI18n',
})
export class I18nPipe implements PipeTransform {
  constructor(private readonly i18n: I18nService) {}
  transform(value: any, data?: StringMap) {
    return this.i18n.translate(value, data);
  }
}
