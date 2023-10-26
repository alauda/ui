import { AfterContentInit, Directive, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

import { coerceAttrBoolean } from '../utils';

import { SelectComponent } from './select.component';
import { TrackFn } from './select.types';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuiSelectValidators {
  static includes<T>(
    options: T[],
    trackFn: TrackFn<T> = val => val,
  ): ValidatorFn {
    return (control: AbstractControl) =>
      options.some(option => trackFn(option) === trackFn(control.value))
        ? null
        : {
            includes: control.value,
          };
  }
}

@Directive({
  selector:
    // eslint-disable-next-line @angular-eslint/directive-selector
    'aui-select[ngModel][includes],aui-select[formControl][includes],aui-select[formControlName][includes]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IncludesDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class IncludesDirective<T> implements Validator, AfterContentInit {
  @Input()
  get includes() {
    return this._includes;
  }

  set includes(val: boolean | '') {
    this._includes = coerceAttrBoolean(val);
    if (this.onValidatorChange) {
      this.onValidatorChange();
    }
  }

  @Input()
  trackFn: TrackFn<T>;

  private _includes = false;

  onValidatorChange: () => void;

  constructor(private readonly selectRef: SelectComponent<T>) {}

  ngAfterContentInit() {
    this.selectRef.allOptions$.subscribe(() => {
      if (this.onValidatorChange) {
        this.onValidatorChange();
      }
    });
  }

  registerOnValidatorChange(fn: () => void) {
    this.onValidatorChange = fn;
  }

  validate(control: AbstractControl): ValidationErrors {
    if (!this.selectRef.selectableOptions?.length || !control.value) {
      return;
    }
    return this.includes
      ? AuiSelectValidators.includes(
          this.selectRef.selectableOptions.map(option => option.value),
          this.trackFn,
        )(control)
      : null;
  }
}
