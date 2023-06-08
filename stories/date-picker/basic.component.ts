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
}
