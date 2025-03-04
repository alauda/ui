import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'story-basic-time-picker',
    template: `
    <aui-time-picker
      [(ngModel)]="time"
      [size]="size"
      [disabled]="disabled"
      placeholder="select time"
      required
    ></aui-time-picker>
    <br />
    Form value: {{ time | json }}
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class TimePickerBasicComponent {
  /**
   * input 大小
   */
  @Input()
  size: 'large' | 'medium' | 'mini' | 'small' = 'medium';

  /**
   * 是否禁用
   */
  @Input()
  disabled = false;
}
