import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <div
      style="height:300px;overflow:auto;"
      cdkScrollable
    >
      <div style="height:1000px">
        选择外部的 cdkScrollable 组件作为指定滚动容器，尝试滚动此元素
      </div>
      <aui-back-top></aui-back-top>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class InscrollComponent {}
