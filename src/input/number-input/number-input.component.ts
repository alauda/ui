import {
  AfterViewInit,
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
import { Bem, buildBem, coerceNumber } from '../../utils';

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
export class NumberInputComponent
  extends CommonFormControl<number>
  implements AfterViewInit {
  bem: Bem = buildBem('aui-number-input');

  @Input()
  size: ComponentSize = ComponentSize.Medium;

  @Input()
  min: string | number = Number.MIN_SAFE_INTEGER;

  @Input()
  max: string | number = Number.MAX_SAFE_INTEGER;

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

  isFocus = false;

  ngAfterViewInit() {
    this.inputRef.nativeElement.value = (this.snapshot.value ?? '') + '';
  }

  override valueIn(v: number) {
    if (this.inputRef) {
      this.inputRef.nativeElement.value = (v ?? '') + '';
    }
    return v;
  }

  override valueOut(value: number) {
    return Math.max(
      coerceNumber(this.min, Number.MIN_SAFE_INTEGER),
      Math.min(
        coerceNumber(this.max, Number.MAX_SAFE_INTEGER),
        this.parsePrecision(value),
      ),
    );
  }

  inputChanged(value: string) {
    this.emitValue(coerceNumber(value, this.snapshot.value));
  }

  takeOneStep(positive: boolean) {
    if (positive) {
      this.emitValue((this.snapshot.value ?? 0) + this.step);
    } else {
      this.emitValue((this.snapshot.value ?? 0) - this.step);
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
