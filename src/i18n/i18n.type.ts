import { InjectionToken } from '@angular/core';

import { en } from './language/en';

export interface I18NInterface {
  locale: string;
  translation: Record<string, string>;
}

export type StringMap = Record<string, string>;

export const I18NInterfaceToken = new InjectionToken('i18n token', {
  factory: () => en,
});
