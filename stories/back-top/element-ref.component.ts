import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <div
      style="height:300px;overflow:auto;"
      #containerRef
    >
      <div style="height:1000px">
        通过指定的 ElementRef 选择滚动容器，尝试滚动此元素
      </div>
    </div>
    <aui-back-top [target]="containerRef"></aui-back-top>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UseElementRefComponent {}
