import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <button
      aui-button
      [square]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
    <button
      aui-button="primary"
      [square]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
    <button
      aui-button="success"
      [square]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
    <button
      aui-button="warning"
      [square]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
    <button
      aui-button="danger"
      [square]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
    <br />
    <br />
    <button
      aui-button
      [square]="true"
      [round]="true"
      [plain]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
    <button
      aui-button="primary"
      [square]="true"
      [round]="true"
      [plain]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
    <button
      aui-button="success"
      [square]="true"
      [round]="true"
      [plain]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
    <button
      aui-button="warning"
      [square]="true"
      [round]="true"
      [plain]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
    <button
      aui-button="danger"
      [square]="true"
      [round]="true"
      [plain]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
    <br />
    <br />
    <button
      aui-button="text"
      [square]="true"
      [plain]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
    <button
      aui-button="text"
      [square]="true"
    >
      <aui-icon icon="magnifier"></aui-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class IconComponent {}
