import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ComponentSize } from 'src/types';

@Component({
  template: `
    <aui-number-input
      [size]="size"
      [step]="step"
      [precision]="precision"
      [min]="min"
      [max]="max"
      [controls]="controls"
      [disabled]="disabled"
      placeholder="placeholder"
      [(ngModel)]="value"
      [clearable]="clearable"
    ></aui-number-input>
    <br />
    <br />
    <aui-number-input
      [size]="size"
      [step]="step"
      [precision]="precision"
      [min]="min"
      [max]="max"
      [controls]="controls"
      [angleControls]="true"
      [disabled]="disabled"
      placeholder="placeholder"
      [(ngModel)]="value"
      [clearable]="clearable"
    ></aui-number-input>
    <br />
    <br />
    <aui-number-input
      [size]="size"
      [step]="step"
      [precision]="precision"
      [min]="min"
      [max]="max"
      [controls]="controls"
      [angleControls]="true"
      [disabled]="disabled"
      placeholder="placeholder"
      [(ngModel)]="value"
      [clearable]="clearable"
    >
      <span auiInputAddonBefore>Memory</span>
      <span auiInputAddonAfter>Gi</span>
    </aui-number-input>
    <br />
    <br />
    value: {{ value | json }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class numberInputComponent {
  size = ComponentSize.Medium;
  min = 0;
  max = 10;
  step = 1;
  precision = 1;
  value = 4;
  disabled = false;
  controls = true;
  clearable = false;
}
