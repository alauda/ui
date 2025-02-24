import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'story-basic-radio',
    template: `
    <p>aui-radio</p>
    <aui-radio-group
      [direction]="direction"
      [(ngModel)]="model"
      [size]="size"
    >
      <aui-radio
        value="1"
        [disabled]="disabled"
        >选项一</aui-radio
      >
      <aui-radio
        value="2"
        [disabled]="disabled"
        >选项二</aui-radio
      >
      <aui-radio
        value="3"
        [disabled]="disabled"
        >选项三</aui-radio
      >
    </aui-radio-group>

    <p>aui-radio-button</p>
    <aui-radio-group
      [direction]="direction"
      [plain]="plain"
      [(ngModel)]="model"
      [size]="size"
    >
      <aui-radio-button
        value="1"
        [disabled]="disabled"
        >选项一</aui-radio-button
      >
      <aui-radio-button
        value="2"
        [disabled]="disabled"
        >选项二</aui-radio-button
      >
      <aui-radio-button
        value="3"
        [disabled]="disabled"
        >选项三</aui-radio-button
      >
    </aui-radio-group>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class RadioBasicComponent {
  /**
   * 是否为朴素按钮（只针对按钮样式的组合)
   */
  @Input()
  plain = false;

  /**
   * 是否禁用
   */
  @Input()
  disabled = false;

  /**
   * 按钮横纵向排列方式
   */
  @Input()
  direction: 'column' | 'row' = 'row';

  /**
   * 按钮大小
   */
  @Input()
  size: 'large' | 'medium' | 'mini' | 'small' = 'medium';

  model = '1';
}
