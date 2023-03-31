import { Component } from '@angular/core';

const langStr =
  'optionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoption';

@Component({
  template: `
    <aui-multi-select
      [options]="options"
      [(ngModel)]="value"
      [useVirtual]="true"
    >
      <ng-template
        auiOptionItemCustom
        let-option="option"
      >
        <aui-option-item
          [label]="option.label"
          [value]="option.value"
          [selected]="option.selected"
          [disabled]="!(option.value % 5)"
          [auiTooltip]="'这是一个禁用选项的提示--' + option.label"
          auiTooltipPosition="top start"
          [auiTooltipDisabled]="!!(option.value % 5)"
        >
          <span
            [ngStyle]="{
              color: !(option.value % 8) ? 'red' : ''
            }"
            >{{ option.label }}gauch</span
          >
        </aui-option-item>
      </ng-template>
    </aui-multi-select>
  `,
})
export class TooltipSelectComponent {
  options = Array.from({ length: 20_000 })
    .fill(null)
    .map((_, idx) => ({
      label:
        `${idx}` +
        langStr.slice(
          0,
          Math.max(0, 3 + idx * +(Math.random() * 10).toFixed(0)),
        ),
      value: idx,
    }));

  value: number[] = [3, 10, 100];
}
