import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-button-group>
      <button aui-button="primary">
        <aui-icon icon="angle_left"></aui-icon>
        <span>上一页</span>
      </button>
      <button aui-button="primary">
        <span>下一页</span>
        <aui-icon icon="angle_right"></aui-icon>
      </button>
    </aui-button-group>
    <br />
    <br />
    <aui-button-group>
      <button
        aui-button="primary"
        [plain]="true"
        [square]="true"
      >
        <aui-icon icon="angles_left"></aui-icon>
      </button>
      <button
        aui-button="primary"
        [plain]="true"
        [square]="true"
      >
        <aui-icon icon="angle_left"></aui-icon>
      </button>
      <button
        aui-button="primary"
        [plain]="true"
        [square]="true"
      >
        <aui-icon icon="angle_right"></aui-icon>
      </button>
      <button
        aui-button="primary"
        [plain]="true"
        [square]="true"
      >
        <aui-icon icon="angles_right"></aui-icon>
      </button>
    </aui-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonGroupComponent {}
