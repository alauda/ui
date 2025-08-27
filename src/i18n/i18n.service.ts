import { Injectable, computed, inject, isDevMode, signal } from '@angular/core';

import { DatePickerType } from '../date-picker/calendar/constant';

import { I18NInterface, I18NInterfaceToken } from './i18n.type';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  readonly $$i18n = signal<I18NInterface>(inject(I18NInterfaceToken));

  $locale = computed(() => this.$$i18n().locale);

  $monthBeforeYear = computed(() => {
    const parts = new Intl.DateTimeFormat(this.$locale()).formatToParts(
      new Date(),
    );
    return (
      parts.findIndex(part => part.type === DatePickerType.Month) <
      parts.findIndex(part => part.type === DatePickerType.Year)
    );
  });

  setI18n(i18n: I18NInterface) {
    this.$$i18n.set(i18n);
  }

  translate(
    key: string,
    data?: Record<string, string>,
    ignoreNonExist = false,
  ) {
    let content = this.$$i18n().translation[key];
    if (content == null) {
      if (isDevMode() && !ignoreNonExist) {
        console.warn(`No exist translate key for ${key}`);
      }
      return key;
    }
    if (data) {
      content = content.replaceAll(
        /{{([^{}]+)}}/g,
        (_matched, $0: string) => data[$0.trim()],
      );
    }
    return content;
  }
}
