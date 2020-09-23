import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CommonFormControl } from '../../form/public-api';
import { ComponentSize } from '../../types';
import { Bem, buildBem } from '../../utils/bem';

@Component({
  selector: 'aui-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  inputs: ['disabled'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
  ],
})
export class NumberInputComponent extends CommonFormControl<number> {
  bem: Bem = buildBem('aui-number-input');

  @Input()
  size = ComponentSize.Medium;

  @Input()
  min = Number.MIN_SAFE_INTEGER;

  @Input()
  max = Number.MAX_SAFE_INTEGER;

  @Input()
  step = 1;

  @Input()
  precision: number;

  @Input()
  controls = true;

  @Input()
  placeholder = '';

  @Input()
  controlsPosition = '';

  minDisabled = false;
  maxDisabled = false;

  constructor(protected cdr: ChangeDetectorRef) {
    super(cdr);
  }

  changeHandle(event: KeyboardEvent) {
    const inputEl = event.target as HTMLInputElement;
    const value = inputEl.value;
    inputEl.value = this.snapshot.value.toString();
    if (Number.isNaN(+value)) {
      this.emitValueChange(this.snapshot.value);
      return;
    }
    this.checkButtonAndSetValue(Number(value));
  }

  takeOneStep(isPositive = true) {
    if (this.disabled) {
      return;
    }
    const step: number = isPositive ? this.step : -this.step;
    const val: number = step + this.snapshot.value;
    if (Number.isNaN(val)) {
      return;
    }
    this.checkButtonAndSetValue(val);
  }

  checkButtonAndSetValue(value: number) {
    this.maxDisabled = value >= this.max;
    this.minDisabled = value <= this.min;
    if (this.maxDisabled) {
      return this.emitValueChange(this.max);
    } else if (this.minDisabled) {
      return this.emitValueChange(this.min);
    }
    this.emitValueChange(value);
  }

  toPrecision(value: number) {
    const precision = this.getPrecision();
    return parseFloat(parseFloat(Number(value).toFixed(precision) + '') + '');
  }

  getPrecision() {
    const { value, step, getValuePrecision, precision } = this;
    const stepPrecision = getValuePrecision(step);
    if (precision !== undefined) {
      return Math.max(precision, stepPrecision);
    } else {
      return Math.max(getValuePrecision(value), stepPrecision);
    }
  }

  getValuePrecision(value: number) {
    if (value === undefined || value === null) {
      return 0;
    }
    const valueString = value.toString();
    const dotPosition = valueString.indexOf('.');
    let precision = 0;
    if (dotPosition !== -1) {
      precision = valueString.length - dotPosition - 1;
    }
    return precision;
  }

  writeValue(val: number) {
    this.value$$.next(this.toPrecision(val));
  }
}
