import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'story-basic-button',
    template: `
    <button
      aui-button
      [plain]="plain"
      [round]="round"
      [disabled]="disabled"
      [loading]="loading"
      [size]="size"
    >
      默认按钮
    </button>
    <button
      aui-button="primary"
      [plain]="plain"
      [round]="round"
      [disabled]="disabled"
      [loading]="loading"
      [size]="size"
    >
      主要按钮
    </button>
    <button
      aui-button="success"
      [plain]="plain"
      [round]="round"
      [disabled]="disabled"
      [loading]="loading"
      [size]="size"
    >
      成功按钮
    </button>
    <button
      aui-button="warning"
      [plain]="plain"
      [round]="round"
      [disabled]="disabled"
      [loading]="loading"
      [size]="size"
    >
      警告按钮
    </button>
    <button
      aui-button="danger"
      [plain]="plain"
      [round]="round"
      [disabled]="disabled"
      [loading]="loading"
      [size]="size"
    >
      危险按钮
    </button>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class ButtonBasicComponent {
  /**
   * 是否为朴素按钮
   */
  @Input() plain = false;

  /**
   * 是否为圆角
   */
  @Input() round = false;

  /**
   * 是否禁用
   */
  @Input() disabled = false;

  /**
   * 是否为加载状态
   */
  @Input() loading = false;

  /**
   * 按钮大小
   */
  @Input()
  size: 'large' | 'medium' | 'mini' | 'small' = 'medium';
}
