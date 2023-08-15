import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import dayjs from 'dayjs';

import { DatePickerType } from '@alauda/ui';

@Component({
  selector: 'story-date-picker-basic',
  template: `
    <aui-date-picker
      [type]="DatePickerType.Day"
      [clearText]="'清除'"
      [(ngModel)]="time"
      placeholder="请选择"
      [weekStartDay]="2"
      [disabled]="disabled"
      [minDate]="minDate"
      [maxDate]="maxDate"
      required
    ></aui-date-picker>
    <br />
    Form value: {{ time?.toDate() }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatePickerBasicComponent {
  @Input()
  disabled = false;

  now = dayjs();
  time = dayjs().add(7, 'day');
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
