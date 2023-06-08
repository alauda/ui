import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'story-switch-basic',
  template: `
    <aui-switch
      style="margin-right:8px;"
      [(ngModel)]="data"
      [disabled]="disabled"
      [loading]="loading"
    ></aui-switch>
    <aui-switch
      [(ngModel)]="initData"
      [disabled]="disabled"
      [loading]="loading"
    ></aui-switch>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SwitchBasicComponent {
  /**
   * 是否加载中
   */
  @Input()
  loading = false;

  /**
   * 是否禁用
   */
  @Input()
  disabled = false;

  initData = true;
}
