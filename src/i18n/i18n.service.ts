import { Inject, Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { I18NInterface, I18NInterfaceToken, StringMap } from './i18n.type';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly i18nChange$$ = new BehaviorSubject<I18NInterface>(
    this._i18n,
  );

  localeChange$ = this.i18nChange$$.asObservable().pipe(pluck('locale'));

  constructor(@Inject(I18NInterfaceToken) private _i18n: I18NInterface) {}

  setI18n(i18n: I18NInterface) {
    this._i18n = i18n;
    this.i18nChange$$.next(i18n);
  }

  get i18n() {
    return this._i18n;
  }

  translate(key: string, data?: StringMap, ignoreNonExist = false) {
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
