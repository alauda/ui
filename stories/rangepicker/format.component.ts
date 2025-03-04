import { ChangeDetectionStrategy, Component } from '@angular/core';
import dayjs from 'dayjs';

@Component({
    template: `
    <aui-range-picker
      [(ngModel)]="range"
      required
      [showTime]="true"
      [format]="'YYYY/MM/DD - HH:mm:ss'"
      style="width: 400px"
    ></aui-range-picker>
    <br />
    Form value: {{ range | json }}
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RangeCustomFormatComponent {
  range = [dayjs(), dayjs()];
}
