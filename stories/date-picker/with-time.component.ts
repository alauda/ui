import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dayjs } from 'dayjs';

import { DatePickerType } from '@alauda/ui';

@Component({
  template: `
    <aui-date-picker
      placeholder="请选择"
      [type]="DatePickerType.Day"
      [(ngModel)]="time"
      [showTime]="true"
    ></aui-date-picker>
    <br />
    Form value: {{ time?.toDate() }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class DatePickerWithTimeComponent {
  time: Dayjs = null;
  DatePickerType = DatePickerType;
}
