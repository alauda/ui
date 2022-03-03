import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, combineLatest, of } from 'rxjs';
import {
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import { createWithMaxRowCount } from '../../input/tags-input/with-max-row-count';
import { ComponentSize } from '../../types';
import { Bem, buildBem, coerceAttrBoolean, coerceString } from '../../utils';
import { BaseSelect } from '../base-select';
import { OptionComponent } from '../option/option.component';
import {
  SelectAllStatus,
  SelectFilterOption,
  TagClassFn,
} from '../select.types';

@Component({
  selector: 'aui-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: [
    '../../input/input.component.scss',
    '../../tag/tag.component.scss',
    './multi-select.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
    {
      provide: BaseSelect,
      useExisting: MultiSelectComponent,
    },
  ],
})
export class MultiSelectComponent<T = unknown>
  extends BaseSelect<T, T[]>
  implements AfterContentInit, AfterViewInit
{
  bem: Bem = buildBem('aui-multi-select');
  bemSelectAll: Bem = buildBem('aui-option');
  selectedOptions$: Observable<Array<SelectFilterOption<T>>>;
  selectAllStatus$: Observable<SelectAllStatus>;
  selectAllStatus: SelectAllStatus;
  hasEnabledOptions$: Observable<boolean>;

  private _allowSelectAll = false;
  override isMulti = true;
  override model: T[] = [];

  values$ = this.model$;

  @Input()
  tagClassFn: TagClassFn<T>;

  @Input()
  maxRowCount = 0;

  @Input()
  customRowHeight = 0; // 0: use default style const value, > 1: for ```tagClassFn``` maybe affect lineHeight

  @Input()
  get allowSelectAll() {
    return this._allowSelectAll;
  }

  set allowSelectAll(val: boolean | '') {
    this._allowSelectAll = coerceAttrBoolean(val);
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

  inputValue = '';

  get rootClass() {
    const size = this.size || ComponentSize.Medium;
    return `aui-input ${this.bem.block(size)} ${
      this.disabled ? 'isDisabled' : ''
    } ${this.focused ? 'isFocused' : ''} ${
      this.displayClearBtn ? 'isClearable' : ''
    } ${this.maxRowCount > 0 ? 'withHeightLimit' : ''}`;
  }

  get tagSize() {
    return this.size === ComponentSize.Large
      ? ComponentSize.Medium
      : ComponentSize.Mini;
  }

  get inputClass() {
    return `${this.bem.element('input', {
      hidden: this.inputReadonly,
    })} aui-tag aui-tag--${this.tagSize}`;
  }

  get displayClearBtn() {
    return !this.disabled && this.clearable && this.model.length;
  }

  get maxHeight() {
    return this.withMaxRowCount.maxHeight();
  }

  private readonly withMaxRowCount = createWithMaxRowCount(this);

  focused = false;

  trackByValue = (_: number, item: SelectFilterOption<T>) =>
    this.trackFn(item.value);

  constructor(cdr: ChangeDetectorRef, private readonly renderer: Renderer2) {
    super(cdr);
  }

  override ngAfterContentInit() {
    super.ngAfterContentInit();

    this.selectedOptions$ = combineLatest([
      this.model$,
      (
        this.contentOptions.changes as Observable<QueryList<OptionComponent<T>>>
      ).pipe(
        startWith(this.contentOptions),
        switchMap((options: QueryList<OptionComponent<T>>) =>
          options.length > 0
            ? combineLatest(
                options.map(option =>
                  combineLatest([
                    option.value$,
                    option.label$,
                    option.labelContext$,
                    option.disabled$,
                  ]).pipe(
                    map(([value, label, labelContext, disabled]) => ({
                      value,
                      label,
                      labelContext,
                      disabled,
                    })),
                  ),
                ),
              )
            : of([] as Array<SelectFilterOption<T>>),
        ),
      ),
    ]).pipe(
      map(([values, options]) =>
        values
          .map(value => {
            const option = options.find(
              option => this.trackFn(option.value) === this.trackFn(value),
            );
            return option
              ? {
                  label:
                    option.label || coerceString(this.trackFn(option.value)),
                  labelContext: option.labelContext,
                  value: option.value,
                  disabled: option.disabled,
                }
              : {
                  label:
                    this.labelFn?.(value) || coerceString(this.trackFn(value)),
                  value,
                };
          })
          // sort disabled options as first
          .sort((a, b) => {
            if (a.disabled) {
              return -1;
            }

            if (b.disabled) {
              return 1;
            }

            return 0;
          }),
      ),
      publishReplay(1),
      refCount(),
    );
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.selectAllStatus$ = combineLatest([
      this.allOptions$,
      this.filterString$,
    ]).pipe(
      switchMap(([allOptions]) =>
        combineLatest([
          ...(allOptions ?? [])
            .filter(({ visible, disabled }) => visible && !disabled)
            .map(({ selected$ }) => selected$),
        ]),
      ),
      map(statuses => {
        const selected = statuses.filter(i => i);
        return selected.length === 0
          ? SelectAllStatus.Empty
          : selected.length !== statuses.length
          ? SelectAllStatus.Indeterminate
          : SelectAllStatus.Checked;
      }),
      startWith(SelectAllStatus.Empty),
      tap(selectAllStatus => (this.selectAllStatus = selectAllStatus)),
      publishReplay(1),
      refCount(),
    );
    this.hasEnabledOptions$ = combineLatest([
      this.allOptions$,
      this.filterString$,
    ]).pipe(
      map(
        ([allOptions]) =>
          !!allOptions.filter(({ visible, disabled }) => visible && !disabled)
            .length,
      ),
    );
  }

  override onShowOptions() {
    super.onShowOptions();
    this.inputRef.nativeElement.focus();
  }

  override onHideOptions() {
    super.onHideOptions();
    this.inputRef.nativeElement.value = '';
    this.renderer.removeStyle(this.inputRef.nativeElement, 'width');
  }

  override onInput(event: Event) {
    super.onInput(event);
    this.setInputWidth();
    this.tooltipRef.updatePosition();
  }

  onInputFocus() {
    this.focused = true;
  }

  onInputBlur() {
    this.focused = false;
    this.closeOption();
  }

  override onKeyDown(event: KeyboardEvent) {
    if (
      event.key === 'Backspace' &&
      this.filterString === '' &&
      this.model.length > 0
    ) {
      this.removeValue(this.model[this.model.length - 1]);
      event.stopPropagation();
      event.preventDefault();
    } else if (event.key === 'Enter') {
      if (
        this.model
          .map(value => this.trackFn(value))
          .includes((event.target as HTMLInputElement).value)
      ) {
        return;
      }
      this.selectFocusedOption();
      event.stopPropagation();
      event.preventDefault();
    } else {
      super.onKeyDown(event);
    }
  }

  selectOption(option: OptionComponent<T>) {
    if (option.selected) {
      this.removeValue(option.value);
    } else {
      this.addValue(option.value);
    }
    const isCustom = !this.contentOptions.some(
      ({ value }) => value === option.value,
    );
    if (isCustom) {
      this.resetFocusedOption();
    }
  }

  addValue(value: T) {
    const values = this.model.concat(value);
    this.emitValue(values);
    if (this.onChange) {
      this.resetInput();
      requestAnimationFrame(() => {
        this.tooltipRef.updatePosition();
      });
    }
  }

  removeValue(value: T) {
    const values = this.model.filter(
      item => this.trackFn(item) !== this.trackFn(value),
    );
    this.emitValue(values);
    if (this.onChange) {
      this.resetInput();
      requestAnimationFrame(() => {
        this.tooltipRef.updatePosition();
      });
    }
  }

  clearValue(event: Event) {
    this.emitValue([]);
    event.stopPropagation();
    event.preventDefault();
  }

  onSelectAllClick() {
    if (this.disabled) {
      return;
    }
    const visibleOptionsValue = this.allOptions
      .filter(({ visible, disabled }) => visible && !disabled)
      .map(({ value }) => value);
    if (this.selectAllStatus === SelectAllStatus.Checked) {
      this.emitValue(
        this.model.filter(value => !visibleOptionsValue.includes(value)),
      );
    } else {
      this.emitValue([...new Set(this.model.concat(visibleOptionsValue))]);
    }
  }

  protected override valueIn(v: T[]): T[] {
    this.resetInput();
    requestAnimationFrame(() => {
      this.tooltipRef.updatePosition();
    });
    return v ?? [];
  }

  private resetInput() {
    this.inputRef.nativeElement.value = '';
    this.setInputWidth();
    this.filterString = '';
  }

  // calculate input element width according to its value
  private setInputWidth() {
    const { value } = this.inputRef.nativeElement;
    if (!value.length) {
      this.inputValue = '';
      requestAnimationFrame(() => {
        this.renderer.removeStyle(this.inputRef.nativeElement, 'width');
      });
    } else {
      this.inputValue = value;
      requestAnimationFrame(() => {
        this.renderer.setStyle(
          this.inputRef.nativeElement,
          'width',
          `${this.inputValueMirror.nativeElement.scrollWidth}px`,
        );
      });
    }
  }
}
