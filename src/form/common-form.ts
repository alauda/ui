import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';

import { coerceAttrBoolean } from '../utils/coercion';

/**
 * form control 内部不保持 value 属性，当不使用 ngModel 时可以通过 [(value)] 实现双向绑定；
 * 也可以分别传入 value 和 监听 valueChange 事件以实现阻断用户操作的功能。
 */
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class CommonFormControl<T> implements ControlValueAccessor {
  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(val) {
    this._disabled = coerceAttrBoolean(val);
  }

  @Input()
  get value() {
    return this._value;
  }

  set value(val) {
    if (val === this._value) {
      return;
    }
    this._value = val;
    this.writeValue(val);
  }

  @Output()
  valueChange = new EventEmitter<T>();

  protected onChange: (_: T) => void;
  protected onTouched: () => void;
  protected value$$ = new ReplaySubject<T>(1);
  private _value: T;
  private _disabled = false;

  value$: Observable<T> = this.value$$.asObservable();

  constructor(protected cdr: ChangeDetectorRef) {}

  protected emitValueChange(value: T) {
    if (this.onChange) {
      this.value$$.next(value);
      this.onChange(value);
    }
    this.valueChange.emit(value);
  }

  registerOnChange(fn: (_: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  abstract writeValue(value: T): void;
}

/**
 * @deprecated use {@link CommonFormControl} instead
 */
export const CommonForm = CommonFormControl;
