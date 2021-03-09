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

import { coerceAttrBoolean } from '../utils';

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

  set disabled(val: boolean | '') {
    this._disabled = coerceAttrBoolean(val);
  }

  @Input()
  get readonly() {
    return this.disabled;
  }

  set readonly(val) {
    this.disabled = val;
  }

  @Input('value')
  get propValue() {
    return this._propValue;
  }

  set propValue(val) {
    if (val === this._propValue) {
      return;
    }
    this._propValue = val;
    this.writeValue(val);
  }

  @Output()
  valueChange = new EventEmitter<T>();

  protected onChange: (_: T) => void;
  protected onTouched: () => void;
  protected value$$ = new ReplaySubject<V>(1);
  private _propValue: T;
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
    this.value$$.next(this.valueIn(value));
  }

  emitValue(value: V) {
    this.emitValueChange(this.valueOut(value));
  }

  emitValueChange(value: T) {
    if (this.onChange) {
      this.onChange(value);
      this.writeValue(value);
    }
    this.valueChange.emit(value);
  }

  protected valueIn(v: T): V {
    return v as any;
  }

  protected valueOut(v: V): T {
    return v as any;
  }
}

/**
 * @deprecated use {@link CommonFormControl} instead
 */
export const CommonForm = CommonFormControl;
