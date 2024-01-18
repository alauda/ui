import { Inject, Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { I18NInterface, I18NInterfaceToken } from './i18n.type';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly i18nChange$$: BehaviorSubject<I18NInterface>;

  localeChange$: Observable<string>;

  constructor(@Inject(I18NInterfaceToken) private _i18n: I18NInterface) {
    this.i18nChange$$ = new BehaviorSubject<I18NInterface>(this._i18n);
    this.localeChange$ = this.i18nChange$$
      .asObservable()
      .pipe(map(i18n => i18n.locale));
  }

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
