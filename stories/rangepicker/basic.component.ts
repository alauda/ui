import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { Dayjs } from 'dayjs';

import { I18nService, en, zh } from '@alauda/ui';

@Component({
    template: `
    <div>
      Current Locale: {{ $locale() }}
      <button (click)="changeLocale()">Toggle</button>
    </div>

    <br />

    <aui-range-picker
      [(ngModel)]="range"
      required
      [clearText]="'clear' | auiI18n"
    ></aui-range-picker>
    <br />
    Form value: {{ range | json }}
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RangeBasicComponent {
  range: [Dayjs, Dayjs] = null;

  $locale = computed(() => this.i18n.$$i18n().locale);

  constructor(public i18n: I18nService) {}

  changeLocale() {
    this.i18n.setI18n(this.$locale() === 'en' ? zh : en);
  }
}
