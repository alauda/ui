import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <button aui-button="text">文字按钮</button>
    <button
      aui-button="text"
      [disabled]="true"
    >
      文字按钮
    </button>
    <br />
    <br />
    <button aui-button="inline">行内按钮</button>
    <button
      aui-button="inline"
      [disabled]="true"
    >
      行内按钮
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextComponent {}
