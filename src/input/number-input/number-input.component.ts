import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { CommonFormControl } from '../../form';
import { ComponentSize } from '../../types';
import { Bem, buildBem, coerceNumber, watchContentExist } from '../../utils';
import {
  InputAddonAfterDirective,
  InputAddonBeforeDirective,
} from '../helper-directives';

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
  implements AfterContentInit, AfterViewInit
{
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

  @Input()
  angleControls = false;

  @Input()
  clearable = false;

  @ViewChild('inputRef', { read: ElementRef })
  inputRef: ElementRef<HTMLInputElement>;

  @ContentChildren(InputAddonBeforeDirective)
  private readonly addonBeforeRefs: QueryList<InputAddonBeforeDirective>;

  @ContentChildren(InputAddonAfterDirective)
  private readonly addonAfterRefs: QueryList<InputAddonAfterDirective>;

  isFocus = false;

  hasAddonBefore$: Observable<boolean>;
  hasAddonAfter$: Observable<boolean>;

  ngAfterContentInit() {
    this.hasAddonBefore$ = watchContentExist(this.addonBeforeRefs);
    this.hasAddonAfter$ = watchContentExist(this.addonAfterRefs);
  }

  ngAfterViewInit() {
    this.inputRef.nativeElement.value = (this.model ?? '') + '';
  }

  override valueIn(v: number) {
    if (this.inputRef) {
      this.inputRef.nativeElement.value = (v ?? '') + '';
    }
    return v;
  }

  override modelOut(value: number) {
    return value === null && this.clearable
      ? value
      : Math.max(
          coerceNumber(this.min, Number.MIN_SAFE_INTEGER),
          Math.min(
            coerceNumber(this.max, Number.MAX_SAFE_INTEGER),
            this.parsePrecision(value),
          ),
        );
  }

  inputChanged(value: string) {
    this.emitModel(
      coerceNumber(value, !value && this.clearable ? null : this.model),
    );
  }

  takeOneStep(positive: boolean) {
    if (positive) {
      this.emitModel((this.model ?? 0) + this.step);
    } else {
      this.emitModel((this.model ?? 0) - this.step);
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
