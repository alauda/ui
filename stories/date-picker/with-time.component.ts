import { ChangeDetectionStrategy, Component } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';

import { DatePickerType } from '@alauda/ui';

@Component({
  template: `
    <aui-date-picker
      placeholder="请选择"
      [(ngModel)]="time"
      [showTime]="true"
      [minDate]="minDate"
      [maxDate]="maxDate"
    ></aui-date-picker>
    <br />
    Form value: {{ time?.toDate() }}
    <div>{{ minDate }}</div>
    <div>{{ maxDate }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatePickerWithTimeComponent {
  time: Dayjs = null;
  DatePickerType = DatePickerType;

  minDate = dayjs()
    .subtract(7, 'day')
    .set('hour', 12)
    .set('minute', 32)
    .set('second', 12);
  maxDate = dayjs()
    .add(7, 'day')
    .set('hour', 17)
    .set('minute', 46)
    .set('second', 25);
}
