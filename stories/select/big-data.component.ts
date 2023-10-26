import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'story-select-basic',
  template: `
    <aui-multi-select
      [(ngModel)]="value"
      [clearable]="true"
      [useVirtual]="true"
      [trackFn]="trackFn"
      [maxRowCount]="2"
      [allowSelectAll]="true"
    >
      <aui-option
        *ngFor="let option of arr"
        [label]="option.value"
        [value]="option"
        [disabled]="option.value === 'option5'"
      >
        {{ option.value }}
      </aui-option>
    </aui-multi-select>
    <br />
    value: {{ value | json }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBigDataComponent {
  arr = Array.from({ length: 10_000 })
    .fill(null)
    .map((_, i) => ({ value: `option${i + 1}`, disabled: i === 5 }));

  value = [{ value: 'option2' }];
  trackFn = (option: { value: string }) => option?.value;
}
