import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import dayjs, { Dayjs } from 'dayjs';

import { DateNavRange } from '@alauda/ui';

@Component({
    template: `
    <aui-range-picker
      [(ngModel)]="range"
      [showTime]="true"
      [weekStartDay]="3"
      [maxDate]="maxDate"
      [minDate]="minDate"
      [disabledDate]="disableDateFn"
      [disabledTime]="disabledTimeFn()"
    ></aui-range-picker>
    <br />
    Form value: {{ control?.value | json }}
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RangeDisableSomeDayComponent {
  range = [dayjs(), dayjs()];

  minDate = dayjs().add(3, 'day');
  maxDate = dayjs().add(10, 'day');

  disableDateFn(date: Dayjs, navRange: DateNavRange) {
    return (
      (navRange === DateNavRange.Month && date.isBefore(dayjs(), 'date')) ||
      date.isSame(dayjs().add(1, 'month').add(2, 'day'), 'date')
    );
  }

  disabledTimeFn() {
    return {
      left: (date: Dayjs) =>
        date?.isSame(dayjs(), 'date')
          ? {
              hours: () => [1, 2, 3, 4],
              minutes: () => [4, 12],
            }
          : null,
    };
  }

  control = new FormControl({
    value: [dayjs(), dayjs().add(3, 'day')],
    disabled: true,
  });
}
