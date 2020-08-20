import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { publishReplay, refCount, tap } from 'rxjs/operators';

import { coerceAttrBoolean } from '../utils/coercion';

/**
 * form control 内部不保持 value 属性，当不使用 ngModel 时可以通过 [(value)] 实现双向绑定；
 * 也可以分别传入 value 和 监听 valueChange 事件以实现阻断用户操作的功能。
 */
@Directive()
// tslint:disable-next-line:directive-class-suffix
export class CommonFormControl<T, V = T> implements ControlValueAccessor {
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
  protected value$$ = new ReplaySubject<any>(1);
  private _value: T;
  private _disabled = false;

  snapshot: { value: V } = { value: null };

  value$: Observable<V> = this.value$$.asObservable().pipe(
    tap(value => {
      this.snapshot.value = value;
    }),
    publishReplay(1),
    refCount(),
  );

  constructor(protected cdr: ChangeDetectorRef) {}

  protected emitValueChange(value: T) {
    if (this.onChange) {
      this.writeValue(value);
      this.onChange(value);
    }
    this.valueChange.emit(value);
  }

  registerOnChange(fn: (_: T) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  writeValue(value: T) {
    this.value$$.next(value);
  }
}

/**
 * @deprecated use {@link CommonFormControl} instead
 */
export const CommonForm = CommonFormControl;
