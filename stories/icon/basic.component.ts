import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-icon
      icon="spinner"
      style="font-size: 24px;"
    ></aui-icon>
    <br />
    <br />
    <button
      aui-button="primary"
      [square]="true"
    >
      <aui-icon
        light="plus"
        dark="minus"
      ></aui-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IconBasicComponent {}
