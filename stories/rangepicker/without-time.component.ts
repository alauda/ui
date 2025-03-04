import { ChangeDetectionStrategy, Component } from '@angular/core';
import dayjs from 'dayjs';

@Component({
    template: `
    <aui-range-picker
      [(ngModel)]="range"
      [showTime]="false"
    ></aui-range-picker>
    <br />
    Form value: {{ range | json }}
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RangeWithoutTimeComponent {
  range = [dayjs(), dayjs()];
}
