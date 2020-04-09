import { AfterContentInit, Directive, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

import { coerceAttrBoolean } from '../utils/coercion';

import { SelectComponent } from './select.component';
import { TrackFn } from './select.types';

// @dynamic
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuiSelectValidators {
  static includes(options: any[], trackFn: TrackFn = val => val): ValidatorFn {
    return (control: AbstractControl) => {
      return options.some(option => trackFn(option) === trackFn(control.value))
        ? null
        : {
            includes: control.value,
          };
    };
  }
}

@Directive({
  selector:
    // tslint:disable-next-line: directive-selector
    'aui-select[ngModel][includes],aui-select[formControl][includes],aui-select[formControlName][includes]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IncludesDirective),
      multi: true,
    },
  ],
})
export class IncludesDirective implements Validator, AfterContentInit {
  @Input()
  get includes() {
    return this._includes;
  }

  set includes(val: any) {
    this._includes = coerceAttrBoolean(val);
    if (this.onValidatorChange) {
      this.onValidatorChange();
    }
  }

  @Input()
  trackFn: TrackFn;

  private _includes = false;

  onValidatorChange: () => void;

  constructor(private readonly selectRef: SelectComponent) {}

  ngAfterContentInit() {
    this.selectRef.contentOptions.changes.subscribe(() => {
      if (this.onValidatorChange) {
        this.onValidatorChange();
      }
    });
  }

  registerOnValidatorChange(fn: () => void) {
    this.onValidatorChange = fn;
  }

  validate(control: AbstractControl): ValidationErrors {
    if (!this.selectRef.contentOptions || !control.value) {
      return;
    }
    return !this.includes
      ? null
      : AuiSelectValidators.includes(
          this.selectRef.contentOptions
            .filter(option => !option.disabled)
            .map(option => option.value),
          this.trackFn,
        )(control);
  }
}
