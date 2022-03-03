import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

import { coerceAttrBoolean } from '../utils';

/**
 * form control 内部不保持 value 属性，当不使用 ngModel 时可以通过 [(value)] 实现双向绑定；
 * 也可以分别传入 value 和 监听 valueChange 事件以实现阻断用户操作的功能。
 */
@Directive()
// tslint:disable-next-line:directive-class-suffix
export class CommonFormControl<V, M = V> implements ControlValueAccessor {
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
  valueChange = new EventEmitter<V>();

  protected onChange: (_: V) => void;
  protected onTouched: () => void;
  private _propValue: V;
  private _disabled = false;

  model: M = null;
  model$ = new ReplaySubject<M>(1);

  constructor(protected cdr: ChangeDetectorRef) {
    this.model$.subscribe(model => {
      this.model = model;
      this.cdr.markForCheck();
    });
  }

  registerOnChange(fn: (_: V) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  writeValue(value: V) {
    this.model$.next(this.valueIn(value));
  }

  emitModel(model: M) {
    this.emitValue(this.modelOut(model));
  }

  emitValue(value: V) {
    if (this.onChange) {
      this.onChange(value);
      this.writeValue(value);
    }
    this.valueChange.emit(value);
  }

  protected valueIn(value: V): M {
    return value as any;
  }

  protected modelOut(model: M): V {
    return model as any;
  }
}

/**
 * @deprecated use {@link CommonFormControl} instead
 */
export const CommonForm = CommonFormControl;
