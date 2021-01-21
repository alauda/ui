import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
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

  @ViewChild('inputRef', { read: ElementRef })
  inputRef: ElementRef<HTMLInputElement>;

  valueIn(v: number) {
    if (this.inputRef) {
      this.inputRef.nativeElement.value = v + '';
    }
    return v;
  }

  valueOut(value: number) {
    return Math.max(
      this.min ?? Number.MIN_SAFE_INTEGER,
      Math.min(this.max ?? Number.MAX_SAFE_INTEGER, this.parsePrecision(value)),
    );
  }

  inputChanged(value: string) {
    this.emitValue(parseFloat(value) || this.snapshot.value);
  }

  takeOneStep(positive: boolean) {
    if (positive) {
      this.emitValue(this.snapshot.value + this.step);
    } else {
      this.emitValue(this.snapshot.value - this.step);
    }
  }

  private parsePrecision(value: number) {
    const precision = this.precision ?? this.getStepPrecision();
    return parseFloat(value.toFixed(precision));
  }

  private getStepPrecision() {
    const step = this.step + '';
    const index = step.indexOf('.');
    return index < 0 ? 0 : step.slice(index + 1).length;
  }
}
