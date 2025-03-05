import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import dayjs from 'dayjs';

@Component({
  template: `
    <aui-range-picker
      [(ngModel)]="range"
      [showTime]="false"
      [maxDate]="maxDate"
      [minDate]="minDate"
    ></aui-range-picker>
    <br />
    Form value: {{ control?.value | json }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RangeDisableSomeYearComponent {
  range = [dayjs(), dayjs()];

  minDate = dayjs().subtract(1, 'year');

  maxDate = dayjs();

  control = new FormControl({
    value: [dayjs(), dayjs().add(3, 'day')],
    disabled: true,
  });
}
