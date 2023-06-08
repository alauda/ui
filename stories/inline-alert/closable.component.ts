import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-inline-alert
      title="可关闭的提示 标题"
      content="可关闭的提示 内容"
      [closable]="true"
      (close)="onClose()"
    ></aui-inline-alert>
    <aui-inline-alert
      content="可关闭的提示 内容"
      [closable]="true"
      (close)="onClose()"
    ></aui-inline-alert>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InlineClosableComponent {
  onClose() {
    console.log('Inline alert closed');
  }
}
