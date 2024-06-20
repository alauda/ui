import { Pipe, PipeTransform } from '@angular/core';

import { I18nService } from './i18n.service';

@Pipe({
  name: 'auiI18n',
  pure: false,
  standalone: true,
})
export class I18nPipe implements PipeTransform {
  constructor(private readonly i18n: I18nService) {}

  transform(value: any, data?: Record<string, string>) {
    return this.i18n.translate(value, data);
  }
}
