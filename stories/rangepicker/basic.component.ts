import { ChangeDetectionStrategy, Component } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  template: `
    <aui-range-picker
      [(ngModel)]="range"
      required
      [clearText]="'清除'"
    ></aui-range-picker>
    <br />
    Form value: {{ range | json }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeBasicComponent {
  range = [dayjs(), dayjs()];
}
