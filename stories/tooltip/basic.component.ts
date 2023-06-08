import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <div style="padding-top: 32px">
      <button
        aui-button="text"
        auiTooltip="默认提示"
      >
        默认提示
      </button>
      <button
        aui-button="text"
        auiTooltip="主要提示"
        auiTooltipType="primary"
      >
        主要提示
      </button>
      <button
        aui-button="text"
        auiTooltip="成功提示"
        auiTooltipType="success"
      >
        成功提示
      </button>
      <button
        aui-button="text"
        auiTooltip="警告提示"
        auiTooltipType="warning"
      >
        警告提示
      </button>
      <button
        aui-button="text"
        auiTooltip="错误提示"
        auiTooltipType="error"
      >
        危险提示
      </button>
      <button
        aui-button="text"
        auiTooltip="信息提示"
        auiTooltipType="info"
      >
        信息提示
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TooltipBasicComponent {}
