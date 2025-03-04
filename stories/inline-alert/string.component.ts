import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    template: `
    <aui-inline-alert
      title="文本标题"
      content="文本内容"
    ></aui-inline-alert>
    <aui-inline-alert content="文本内容"></aui-inline-alert>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class InlineStringComponent {}
