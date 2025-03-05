import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <div
      style="height:300px;overflow:auto;"
      class="target"
    >
      <div style="height:1000px">通过选择器指定滚动容器，尝试滚动此元素</div>
    </div>
    <aui-back-top target=".target"></aui-back-top>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class UseSelectorComponent {}
