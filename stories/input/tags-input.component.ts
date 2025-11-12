import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

import { ComponentSize } from '@alauda/ui';

@Component({
  selector: 'storybook-tags-input',
  template: `
    <aui-tags-input
      [size]="size"
      [formControl]="control"
      [clearable]="true"
      [allowRepeat]="allowRepeat"
      [allowEmpty]="allowEmpty"
      placeholder="placeholder"
      [maxRowCount]="3"
    ></aui-tags-input>
    {{ control.value | json }} status:{{ control.status }}
    <br />
    <button (click)="printStatus()">submit</button>
    <br />
    <br />
    <div>只读标签，不可删除</div>
    <aui-tags-input
      [size]="size"
      [formControl]="control"
      [inputValidator]="checkFn"
      [maxRowCount]="3"
      [clearable]="true"
      [readonlyTags]="['service']"
      [allowRepeat]="allowRepeat"
      [allowEmpty]="allowEmpty"
      placeholder="placeholder"
    ></aui-tags-input>
    <br />
    <br />

    <div>多行 tags maxRowCount: {{ maxRowCount }}</div>
    <aui-tags-input
      style="width: 400px;"
      [size]="size"
      [formControl]="rowsControl"
      [inputValidator]="checkFn"
      [maxRowCount]="maxRowCount"
      [clearable]="true"
      [readonlyTags]="['service']"
      [allowRepeat]="allowRepeat"
      [allowEmpty]="allowEmpty"
      placeholder="placeholder"
    ></aui-tags-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TagsInputComponent {
  value = ['app', 'service'];
  rowsValue = [
    'app123456789123456789123456789',
    'service',
    'db23456789123456789123456789',
    'zxcvbnmasdfghjkqwertyuiop',
  ];
  maxRowCount = 2;
  pattern = /^a/;
  sizeOptions = {
    [ComponentSize.Large]: ComponentSize.Large,
    [ComponentSize.Medium]: ComponentSize.Medium,
    [ComponentSize.Small]: ComponentSize.Small,
    [ComponentSize.Mini]: ComponentSize.Mini,
  };

  checkArrFn: ValidatorFn = control => {
    const value = control.value as string[];
    if (value.includes('b')) {
      return { patternB: true };
    }
    return null;
  };

  control = new FormControl(this.value, {
    validators: [Validators.required, this.checkArrFn],
  });

  rowsControl = new FormControl(this.rowsValue, {
    validators: [this.checkArrFn],
  });

  size = ComponentSize.Medium;
  allowRepeat = true;
  allowEmpty = false;
  checkFn: ValidatorFn = control => {
    const value = control.value as string;
    if (value.startsWith('a')) {
      return { patternA: true };
    }
    return null;
  };

  printStatus = () => {
    console.log('print control status to make sure sync', this.control.status);
  };
}
