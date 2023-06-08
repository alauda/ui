import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'story-basic-tabs',
  template: `
    <aui-tab-group
      [type]="type"
      [size]="size"
      [(tab)]="tab"
    >
      <aui-tab
        name="a"
        label="Tab 0"
        [disabled]="disabled"
      >
        <aui-card> Content 1</aui-card>
      </aui-tab>
      <aui-tab
        name="b"
        label="Tab 1"
        [disabled]="disabled"
      >
        <aui-card> Content 2</aui-card>
      </aui-tab>
      <aui-tab
        name="c"
        label="Tab 2"
        [disabled]="disabled"
      >
        <aui-card> Content 3</aui-card>
      </aui-tab>
    </aui-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TabsBasicComponent {
  /**
   * 样式主题
   */
  @Input()
  type: 'line' | 'card' = 'line';

  /**
   * 是否禁用
   */
  @Input()
  disabled = false;

  /**
   * 尺寸
   */
  @Input()
  size: 'large' | 'medium' | 'small' = 'medium';

  tab = 'a';
}
