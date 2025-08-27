import { ChangeDetectionStrategy, Component } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';

import { DateNavRange, DatePickerType } from '@alauda/ui';

@Component({
  template: `
    <aui-date-picker
      placeholder="请选择"
      [type]="DatePickerType.Day"
      [(ngModel)]="time"
      [showTime]="true"
      [disabledDate]="disableDateFn"
    ></aui-date-picker>
    <br />
    Form value: {{ time?.toDate() }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class DatePickerTodayComponent {
  time: Dayjs = null;
  DatePickerType = DatePickerType;
  disableDateFn = (date: Dayjs, navRange: DateNavRange) => {
    return date.isBefore(
      dayjs(),
      navRange === DateNavRange.Month
        ? 'date'
        : navRange === DateNavRange.Year
        ? 'month'
        : 'year',
    );
  };
}
