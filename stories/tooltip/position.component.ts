import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <div class="container">
      <div class="center">
        <button
          aui-button="text"
          auiTooltip="top start"
          auiTooltipPosition="top start"
        >
          上左
        </button>
        <button
          aui-button="text"
          auiTooltip="top"
          auiTooltipPosition="top"
        >
          正上
        </button>
        <button
          aui-button="text"
          auiTooltip="top end"
          auiTooltipPosition="top end"
        >
          上右
        </button>
      </div>
      <div class="side">
        <button
          aui-button="text"
          auiTooltip="start top"
          auiTooltipPosition="start top"
        >
          左上
        </button>
        <button
          aui-button="text"
          auiTooltip="end top"
          auiTooltipPosition="end top"
        >
          右上
        </button>
      </div>
      <div class="side">
        <button
          aui-button="text"
          auiTooltip="start"
          auiTooltipPosition="start"
        >
          正左
        </button>
        <button
          aui-button="text"
          auiTooltip="end"
          auiTooltipPosition="end"
        >
          正右
        </button>
      </div>
      <div class="side">
        <button
          aui-button="text"
          auiTooltip="start bottom"
          auiTooltipPosition="start bottom"
        >
          左下
        </button>
        <button
          aui-button="text"
          auiTooltip="end bottom"
          auiTooltipPosition="end bottom"
        >
          右下
        </button>
      </div>
      <div class="center">
        <button
          aui-button="text"
          auiTooltip="bottom start"
          auiTooltipPosition="bottom start"
        >
          下左
        </button>
        <button
          aui-button="text"
          auiTooltip="bottom"
          auiTooltipPosition="bottom"
        >
          正下
        </button>
        <button
          aui-button="text"
          auiTooltip="bottom end"
          auiTooltipPosition="bottom end"
        >
          下右
        </button>
      </div>
    </div>
    <style>
      .container {
        margin: auto;
        padding-top: 32px;
        width: fit-content;
      }
      .side {
        display: flex;
        justify-content: space-between;
        width: 240px;
      }
      .center {
        display: flex;
        justify-content: center;
      }
      .container div + div {
        margin-top: 8px;
      }
    </style>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TooltipPositionComponent {}
