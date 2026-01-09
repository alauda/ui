import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
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
  UntypedFormControl,
} from '@angular/forms';
import { take } from 'rxjs';

import { CommonFormControl } from '../../form';
import { ComponentSize } from '../../internal/types';
import { Bem, buildBem } from '../../internal/utils';
import { TagComponent } from '../../tag/tag.component';

import { createWithMaxRowCount } from './with-max-row-count';

export const INPUT_ERROR_KEY = 'input_data_error';

interface TagItem {
  value: string;
  isInputting: boolean;
}

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
  standalone: true,
  imports: [TagComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsInputComponent),
      multi: true,
    },
  ],
})
export class TagsInputComponent
  extends CommonFormControl<string[], TagItem[]>
  implements AfterViewInit, OnChanges
{
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

  @Input()
  maxRowCount = 0;

  @Input()
  customRowHeight = 0; // 0: use default style const value, > 1: for ```tagClassFn``` maybe affect lineHeight

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

  @HostBinding('style.position')
  get hostPosition() {
    return this.withMaxRowCount.hostPosition();
  }

  @HostBinding('style.display')
  get hostDisplay() {
    return this.withMaxRowCount.hostDisplay();
  }

  get maxHeight() {
    return this.withMaxRowCount.maxHeight();
  }

  private readonly withMaxRowCount = createWithMaxRowCount(this);

  focused = false;

  get confirmedTags(): TagItem[] {
    return this.model.filter(item => !item.isInputting);
  }

  readonly inputControl: UntypedFormControl;
  controlContainer: NgControl;

  get rootClass() {
    const size = this.size || ComponentSize.Medium;
    return `aui-input ${this.bem.block(size)} ${
      this.disabled ? 'isDisabled' : ''
    } ${this.focused ? 'isFocused' : ''} ${
      this.clearable ? 'isClearable' : ''
    } ${this.maxRowCount > 0 ? 'withHeightLimit' : ''}`;
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
    this.inputControl = this.fb.control('');
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

  onRemove(index: number) {
    const target = this.model[index];
    if (target && this.readonlyTags.includes(target.value)) {
      return;
    }
    this.model = this.model.filter((_, i) => i !== index);
    this.emitModel(this.model);
  }

  onInput() {
    const value = this.inputRef.nativeElement.value;
    const lastItem = this.model[this.model.length - 1];

    if (lastItem?.isInputting) {
      this.model = value
        ? [...this.model.slice(0, -1), { value, isInputting: true }]
        : this.model.slice(0, -1);
    } else if (value) {
      this.model = [...this.model, { value, isInputting: true }];
    }

    this.emitModel(this.model);

    if (
      this.controlContainer?.control?.errors?.[INPUT_ERROR_KEY] &&
      Object.keys(this.controlContainer.control.errors).length === 1
    ) {
      this.controlContainer.control.setErrors(null);
    }

    requestAnimationFrame(() => {
      if (value.length) {
        this.renderer.setStyle(
          this.inputRef.nativeElement,
          'width',
          this.inputValueMirror.nativeElement.scrollWidth + 'px',
        );
      } else {
        this.renderer.removeStyle(this.inputRef.nativeElement, 'width');
      }
    });
  }

  onKeyDown(event: KeyboardEvent) {
    const inputEl = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && inputEl.value === '') {
      this.onRemove(this.model.length - 1);
      event.stopPropagation();
      event.preventDefault();
    } else if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      requestAnimationFrame(() => {
        this.confirmInput(inputEl.value);
      });
    }
  }

  onInputFocus() {
    this.focused = true;
  }

  onInputBlur(event: Event) {
    this.focused = false;
    this.confirmInput((event.target as HTMLInputElement).value);
    if (this.onTouched) {
      this.onTouched();
    }
  }

  protected override valueIn(v: string[]): TagItem[] {
    const tags = v || [];

    const items = tags.map((value, index) => ({
      value,
      isInputting:
        this.model?.[index]?.value === value
          ? this.model[index].isInputting
          : false,
    }));

    if (!items.some(item => item.isInputting)) {
      this.clearInput();
    }

    return this.sortByReadonly(items);
  }

  protected override modelOut(model: TagItem[]): string[] {
    return model.map(item => item.value);
  }

  private sortByReadonly(items: TagItem[]): TagItem[] {
    if (!this.readonlyTags.length) {
      return items;
    }
    const readonlySet = new Set(this.readonlyTags);
    const readonlyItems: TagItem[] = [];
    const normalItems: TagItem[] = [];

    items.forEach(item => {
      if (readonlySet.has(item.value)) {
        readonlyItems.push(item);
      } else {
        normalItems.push(item);
      }
    });

    return [...readonlyItems, ...normalItems];
  }

  private removeInputtingItem() {
    this.model = this.model.filter(item => !item.isInputting);
    this.clearInput();
    this.emitModel(this.model);
  }

  private confirmInputtingItem() {
    this.model = this.model.map(item =>
      item.isInputting ? { value: item.value, isInputting: false } : item,
    );
    this.clearInput();
    this.emitModel(this.model);
  }

  private confirmInput(value: string) {
    if (
      (!this.allowEmpty && !value) ||
      (!this.allowRepeat &&
        this.confirmedTags.some(item => item.value === value))
    ) {
      this.removeInputControlError();
      this.removeInputtingItem();
      return;
    }

    this.inputControl.setValue(value);
    this.syncControlStatus();

    if (this.inputControl.valid) {
      this.confirmInputtingItem();
    } else if (this.inputControl.pending) {
      this.inputControl.statusChanges.pipe(take(1)).subscribe(_ => {
        this.syncControlStatus();
        if (this.inputControl.valid) {
          this.confirmInputtingItem();
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
        ...this.controlContainer?.control?.errors,
        [INPUT_ERROR_KEY]: errors,
      });
    } else if (disabled) {
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
