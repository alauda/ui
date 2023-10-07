import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dayjs } from 'dayjs';

import { I18nService, en, zh } from '@alauda/ui';

@Component({
  template: `
    <div>
      Current Locale: {{ i18n.i18n.locale }}
      <button (click)="changeLocale()">Toggle</button>
    </div>

    <br />

    <aui-range-picker
      [(ngModel)]="range"
      required
      [clearText]="'清除'"
    ></aui-range-picker>
    <br />
    Form value: {{ range | json }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeBasicComponent {
  range: [Dayjs, Dayjs] = null;

  constructor(public i18n: I18nService) {}

  changeLocale() {
    this.i18n.setI18n(this.i18n.i18n.locale === 'en' ? zh : en);
  }
}
