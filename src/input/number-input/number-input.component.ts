import { NgClass, NgIf, NgStyle, AsyncPipe } from '@angular/common';
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
  numberAttribute,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { CommonFormControl } from '../../form';
import { IconComponent } from '../../icon/icon.component';
import { ClickOutsideDirective } from '../../shared/click-outside.directive';
import { ComponentSize } from '../../types';
import { Bem, buildBem, watchContentExist } from '../../utils';
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
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    ClickOutsideDirective,
    IconComponent,
    NgStyle,
    AsyncPipe,
  ],
})
export class NumberInputComponent
  extends CommonFormControl<number>
  implements AfterContentInit, AfterViewInit
{
  bem: Bem = buildBem('aui-number-input');

  @Input()
  size: ComponentSize = ComponentSize.Medium;

  @Input({
    transform: (val: number | string) =>
      numberAttribute(val, Number.MIN_SAFE_INTEGER),
  })
  min = Number.MIN_SAFE_INTEGER;

  @Input({
    transform: (val: number | string) =>
      numberAttribute(val, Number.MAX_SAFE_INTEGER),
  })
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
      : Math.max(this.min, Math.min(this.max, this.parsePrecision(value)));
  }

  inputChanged(value: string) {
    this.emitModel(
      numberAttribute(value, !value && this.clearable ? null : this.model),
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
