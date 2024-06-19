import { Injectable, inject, isDevMode } from '@angular/core';
import { BehaviorSubject, map, startWith } from 'rxjs';

import { DatePickerType } from '..';

import { I18NInterface, I18NInterfaceToken } from './i18n.type';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private _i18n: I18NInterface = inject(I18NInterfaceToken);

  private readonly i18nChange$$ = new BehaviorSubject<I18NInterface>(
    this._i18n,
  );

  localeChange$ = this.i18nChange$$
    .asObservable()
    .pipe(map(i18n => i18n.locale));

  monthBeforeYear$ = this.localeChange$.pipe(
    map(locale => {
      const parts = new Intl.DateTimeFormat(locale).formatToParts(new Date());
      return (
        parts.findIndex(part => part.type === DatePickerType.Month) <
        parts.findIndex(part => part.type === DatePickerType.Year)
      );
    }),
    startWith(false),
  );

  setI18n(i18n: I18NInterface) {
    this._i18n = i18n;
    this.i18nChange$$.next(i18n);
  }

  get i18n() {
    return this._i18n;
  }

  translate(
    key: string,
    data?: Record<string, string>,
    ignoreNonExist = false,
  ) {
    let content = this._i18n.translation[key];
    if (content == null) {
      if (isDevMode() && !ignoreNonExist) {
        console.warn(`No exist translate key for ${key}`);
      }
      return key;
    }
    if (data) {
      content = content.replaceAll(
        /{{([^{}]+)}}/,
        (_matched, $0: string) => data[$0.trim()],
      );
    }
    return content;
  }
}
