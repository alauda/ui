import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <div style="height:1000px">
      默认选择 window 作为滚动对象，尝试滚动此元素
    </div>
    <aui-back-top></aui-back-top>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class DefaultWindowComponent {}
