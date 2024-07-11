import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'story-basic-tag',
  template: `
    <aui-tag
      type="primary"
      [border]="border"
      [size]="size"
      [solid]="solid"
      [closeable]="closeable"
      [invalid]="invalid"
      [round]="round"
      [allowClick]="allowClick"
      >primary</aui-tag
    >
    <aui-tag
      type="success"
      [border]="border"
      [size]="size"
      [solid]="solid"
      [closeable]="closeable"
      [invalid]="invalid"
      [round]="round"
      [allowClick]="allowClick"
      >success</aui-tag
    >
    <aui-tag
      type="warning"
      [border]="border"
      [size]="size"
      [solid]="solid"
      [closeable]="closeable"
      [invalid]="invalid"
      [round]="round"
      [allowClick]="allowClick"
      >warning</aui-tag
    >
    <aui-tag
      type="error"
      [border]="border"
      [size]="size"
      [solid]="solid"
      [closeable]="closeable"
      [invalid]="invalid"
      [round]="round"
      [allowClick]="allowClick"
      >error</aui-tag
    >
    <aui-tag
      type="info"
      [border]="border"
      [size]="size"
      [solid]="solid"
      [closeable]="closeable"
      [invalid]="invalid"
      [round]="round"
      [allowClick]="allowClick"
      >info</aui-tag
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TagBasicComponent {
  /**
   * 是否添加边框
   */
  @Input()
  border = false;

  /**
   * 是否为实心
   */
  @Input()
  solid = false;

  /**
   * 标签大小
   */
  @Input()
  size: 'large' | 'medium' | 'mini' | 'small' = 'medium';

  /**
   * 是否可以关闭
   */
  @Input()
  closeable = false;

  /**
   * 是否无效
   */
  @Input()
  invalid = false;

  /**
   * 是否为圆角
   */
  @Input()
  round = true;

  /**
   * hover是下划线
   */
  @Input()
  allowClick = false;
}
