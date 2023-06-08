import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-multi-select
      [(ngModel)]="value"
      [maxRowCount]="6"
      [allowSelectAll]="true"
      [clearable]="true"
      [trackFn]="trackFn"
    >
      <aui-option
        *ngFor="let option of arr"
        [label]="option.value"
        [value]="option"
        [disabled]="option.value === 'option5'"
      >
        {{ option.value }}
      </aui-option>
      <aui-option-placeholder>Empty</aui-option-placeholder>
    </aui-multi-select>
    <br />
    value: {{ value | json }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectMultipleComponent {
  arr = Array.from({ length: 50 })
    .fill(null)
    .map((_, i) => ({ value: `option${i + 1}` }));

  value = [{ value: 'option1' }, { value: 'option5' }];
  trackFn = (res: { value: string }) => res.value;
}
