import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dayjs } from 'dayjs';

import { DatePickerType } from '@alauda/ui';

@Component({
    template: `
    <aui-date-picker
      placeholder="请选择"
      [type]="DatePickerType.Month"
      [(ngModel)]="month"
    ></aui-date-picker>
    <br />
    Form value: {{ month?.toDate() }}
    <br />
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class DatePickerMonthComponent {
  month: Dayjs = null;
  DatePickerType = DatePickerType;
}
