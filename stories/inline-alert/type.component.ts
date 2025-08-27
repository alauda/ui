import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-inline-alert
      title="默认标题"
      content="默认内容"
    ></aui-inline-alert>
    <aui-inline-alert
      type="success"
      title="成功标题"
      content="成功内容"
    ></aui-inline-alert>
    <aui-inline-alert
      type="warning"
      title="警告标题"
      content="警告内容"
    ></aui-inline-alert>
    <aui-inline-alert
      type="danger"
      title="危险标题"
      content="危险内容"
    ></aui-inline-alert>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class InlineTypeComponent {}
