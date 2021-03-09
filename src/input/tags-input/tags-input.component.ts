import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  AsyncValidatorFn,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount, take, tap } from 'rxjs/operators';

import { CommonFormControl } from '../../form/public-api';
import { ComponentSize } from '../../types';
import { Bem, buildBem } from '../../utils';

export const INPUT_ERROR_KEY = 'input_data_error';

@Component({
  selector: 'aui-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: [
    '../../input/input.component.scss',
    '../../tag/tag.component.scss',
    './tags-input.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsInputComponent),
      multi: true,
    },
  ],
})
export class TagsInputComponent
  extends CommonFormControl<string[]>
  implements AfterViewInit, OnChanges {
  bem: Bem = buildBem('aui-tags-input');

  @Input()
  placeholder = '';

  @Input()
  size: ComponentSize = ComponentSize.Medium;

  // TODO: implement this feature
  @Input()
  clearable: boolean | '' = false;

  @Input()
  allowRepeat: boolean | '' = false;

  @Input()
  allowEmpty: boolean | '' = false;

  @Input()
  readonlyTags: string[] | readonly string[] = [];

  _inputValidator: ValidatorFn;
  _inputAsyncValidator: AsyncValidatorFn;

  @Input()
  set inputValidator(fn: ValidatorFn | ValidatorFn[]) {
    this._inputValidator = Array.isArray(fn) ? Validators.compose(fn) : fn;
  }

  get inputValidator() {
    return this._inputValidator;
  }

  @Input()
  set inputAsyncValidator(fn: AsyncValidatorFn | AsyncValidatorFn[]) {
    this._inputAsyncValidator = Array.isArray(fn)
      ? Validators.composeAsync(fn)
      : fn;
  }

  get inputAsyncValidator() {
    return this._inputAsyncValidator;
  }

  @ViewChild('inputRef', { static: true })
  inputRef: ElementRef<HTMLInputElement>;

  @ViewChild('inputValueMirror', { static: true })
  inputValueMirror: ElementRef<HTMLElement>;

  snapshot = {
    value: [] as string[],
  };

  value$: Observable<string[]> = this.value$$.asObservable().pipe(
    map(value => this.sortByReadonly(value)),
    tap(value => {
      this.snapshot.value = value;
      this.clearInput();
    }),
    publishReplay(1),
    refCount(),
  );

  focused = false;

  // 内置form control，仅作校验使用
  private readonly inputControl = this.fb.control('');
  // 外层 FormControl，所有的校验逻辑针对输入数据
  controlContainer: NgControl;

  get rootClass() {
    const size = this.size || ComponentSize.Medium;
    return `aui-input ${this.bem.block(size)} ${
      this.disabled ? 'isDisabled' : ''
    } ${this.focused ? 'isFocused' : ''} ${
      this.clearable ? 'isClearable' : ''
    }`;
  }

  get tagSize() {
    return this.size === ComponentSize.Large
      ? ComponentSize.Medium
      : ComponentSize.Mini;
  }

  get inputClass() {
    return `${this.bem.element('input', {
      hidden:
        this.disabled || (!this.focused && !this.inputRef?.nativeElement.value),
    })} aui-tag aui-tag--${this.tagSize}`;
  }

  constructor(
    cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder,
    private readonly renderer: Renderer2,
    private readonly injector: Injector,
  ) {
    super(cdr);
  }

  ngOnChanges({
    inputValidator,
    inputAsyncValidator,
    disabled,
  }: SimpleChanges) {
    if (disabled) {
      this.inputControl[disabled.currentValue ? 'disable' : 'enable']({
        emitEvent: false,
      });
    }
    if (inputValidator) {
      this.inputControl.setValidators(this.inputValidator);
    }
    if (inputAsyncValidator) {
      this.inputControl.setAsyncValidators(this.inputAsyncValidator);
    }
  }

  ngAfterViewInit() {
    this.controlContainer = this.injector.get(NgControl, null);
  }

  writeValue(val: string[]) {
    this.value$$.next(val || []);
  }

  onRemove(index: number) {
    const target = this.snapshot.value[index];
    if (target && this.readonlyTags.includes(target)) {
      return;
    }
    this.emitValueChange(this.snapshot.value.filter((_, i) => i !== index));
  }

  onInput() {
    const value = this.inputRef.nativeElement.value;
    // make sure value sync to span element
    requestAnimationFrame(() => {
      if (!value.length) {
        this.renderer.removeStyle(this.inputRef.nativeElement, 'width');
      } else {
        this.renderer.setStyle(
          this.inputRef.nativeElement,
          'width',
          this.inputValueMirror.nativeElement.scrollWidth + 'px',
        );
      }
    });
  }

  onKeyDown(event: KeyboardEvent) {
    const inputEl = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && inputEl.value === '') {
      this.onRemove(this.snapshot.value.length - 1);
      event.stopPropagation();
      event.preventDefault();
    } else if (event.key === 'Enter') {
      this.pushValue(inputEl.value);
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onInputFocus() {
    this.focused = true;
  }

  onInputBlur(event: Event) {
    this.focused = false;
    this.pushValue((event.target as HTMLInputElement).value);
    if (this.onTouched) {
      this.onTouched();
    }
  }

  trackByValue(_: number, value: string) {
    return value;
  }

  private sortByReadonly(items: string[]) {
    return this.readonlyTags.length
      ? [
          ...items.reduce(
            (acc, curr) => acc.add(curr),
            new Set(this.readonlyTags),
          ),
        ]
      : items;
  }

  private pushValue(value: string) {
    if (!this.allowEmpty && !value) {
      this.removeInputControlError();
      return;
    }
    if (!this.allowRepeat && this.snapshot.value.includes(value)) {
      return;
    }
    this.inputControl.setValue(this.inputRef.nativeElement.value);
    // inputControl 自身的状态为同步计算
    this.syncControlStatus();
    if (this.inputControl.valid) {
      this.emitValueChange(this.snapshot.value.concat(value));
    } else if (this.inputControl.pending) {
      // PENDING 后只会变为 VALID 或 INVALID 的决议状态
      this.inputControl.statusChanges.pipe(take(1)).subscribe(_ => {
        this.syncControlStatus();
        if (this.inputControl.valid) {
          this.emitValueChange(this.snapshot.value.concat(value));
        }
      });
    }
  }

  private syncControlStatus() {
    const { pending, valid, invalid, disabled, errors } = this.inputControl;
    if (valid) {
      this.removeInputControlError();
      this.controlContainer?.control.markAsDirty();
    } else if (pending) {
      this.controlContainer?.control.markAsPending();
    } else if (invalid) {
      this.controlContainer?.control.markAsDirty();
      this.controlContainer?.control.setErrors({
        ...(this.controlContainer?.control?.errors || {}),
        [INPUT_ERROR_KEY]: errors,
      });
    } else if (disabled) {
      // 与当前 input 校验脱离
      this.controlContainer?.control?.updateValueAndValidity();
    }
  }

  private removeInputControlError() {
    let errors = this.controlContainer?.control.errors;
    if (errors?.[INPUT_ERROR_KEY]) {
      delete errors[INPUT_ERROR_KEY];
    }
    if (Object.keys(errors || {}).length === 0) {
      errors = null;
    }
    this.controlContainer?.control.setErrors(errors);
  }

  private clearInput() {
    this.renderer.removeStyle(this.inputRef.nativeElement, 'width');
    this.inputRef.nativeElement.value = '';
    this.inputControl.setValue('');
  }
}
