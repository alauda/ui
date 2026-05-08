import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-select
      [(ngModel)]="value"
      [labelFn]="labelFn"
      [trackFn]="trackFn"
      >
      @for (i of arr; track i) {
        <aui-option-group>
          @if (i !== 1) {
            <div
              auiOptionGroupTitle
              >
              group {{ i }}
            </div>
          }
          @for (j of arr; track j) {
            <aui-option
              [label]="'option' + (arr.length * i + j)"
              [value]="{ key: 'option' + (arr.length * i + j) }"
              >
              <aui-icon icon="sun"></aui-icon>
              option {{ arr.length * i + j }}
            </aui-option>
          }
        </aui-option-group>
      }
      <aui-option-placeholder>Empty</aui-option-placeholder>
    </aui-select>
    <br />
    <br />
    value: {{ value | json }}
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class SelectGroupComponent {
  arr = Array.from({ length: 5 })
    .fill(null)
    .map((_, i) => i + 1);

  value = { key: Symbol('special'), value: 'option11' };
  labelFn = (option: { key: string; value: string }) => option?.value;
  trackFn = (val: { key: string; value: string }) =>
    val ? val.key || val : val;
}
