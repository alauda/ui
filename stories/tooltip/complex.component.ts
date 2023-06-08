import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <div style="padding: 64px 0 0 80px;">
      <button
        aui-button="primary"
        #tooltip="auiTooltip"
        [auiTooltip]="template"
        auiTooltipTrigger="click"
        auiTooltipType="info"
        auiTooltipPosition="top end"
      >
        点击删除
      </button>
      <ng-template #template>
        <div class="popper">
          确定要删除吗？
          <div class="footer">
            <button
              aui-button="text"
              size="mini"
              (click)="tooltip.hide()"
            >
              取消
            </button>
            <button
              aui-button="text"
              size="mini"
              (click)="tooltip.hide()"
            >
              确定
            </button>
          </div>
        </div>
      </ng-template>
    </div>
    <style>
      .popper {
        width: 120px;
      }
      .footer {
        margin-top: 8px;
        display: flex;
        justify-content: flex-end;
      }
    </style>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TooltipComplexComponent {}
