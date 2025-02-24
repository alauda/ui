import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import dayjs from 'dayjs';

@Component({
    template: `
    <aui-range-picker
      [formControl]="control"
      [showTime]="false"
    ></aui-range-picker>
    <br />
    Form value: {{ control?.value | json }}
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RangeDisabledComponent {
  control = new FormControl({
    value: [dayjs(), dayjs().add(3, 'day')],
    disabled: true,
  });
}
