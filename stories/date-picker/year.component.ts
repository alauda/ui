import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dayjs } from 'dayjs';

import { DatePickerType } from '@alauda/ui';

@Component({
  template: `
    <aui-date-picker
      placeholder="请选择"
      [type]="DatePickerType.Year"
      [(ngModel)]="year"
    ></aui-date-picker>
    <br />
    Form value: {{ year?.toDate() }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatePickerYearComponent {
  year: Dayjs = null;
  DatePickerType = DatePickerType;
}
