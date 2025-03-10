import {
  NgFor,
  NgClass,
  NgIf,
  NgTemplateOutlet,
  AsyncPipe,
} from '@angular/common';
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
import {
  Observable,
  combineLatest,
  of,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import { I18nPipe } from '../../i18n/i18n.pipe';
import { IconComponent } from '../../icon/icon.component';
import { createWithMaxRowCount } from '../../input/tags-input/with-max-row-count';
import { ComponentSize } from '../../internal/types';
import {
  Bem,
  buildBem,
  coerceAttrBoolean,
  coerceString,
  publishRef,
} from '../../internal/utils';
import { TagComponent } from '../../tag/tag.component';
import { TooltipDirective } from '../../tooltip/tooltip.directive';
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
  imports: [
    TooltipDirective,
    IconComponent,
    NgFor,
    TagComponent,
    NgClass,
    NgIf,
    NgTemplateOutlet,
    OptionComponent,
    AsyncPipe,
    I18nPipe,
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

  override isMulti = true;
  override model: T[] = [];

  values$ = this.model$;

  @Input()
  tagClassFn: TagClassFn<T>;

  @Input()
  maxRowCount = 0;

  @Input()
  customRowHeight = 0; // 0: use default style const value, > 1: for ```tagClassFn``` maybe affect lineHeight

  @Input({ transform: coerceAttrBoolean })
  allowSelectAll: boolean;

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
  hasDisabledOption = false;

  get rootClass() {
    const size = this.size || ComponentSize.Medium;
    return `aui-input ${this.bem.block(size)}`;
  }

  get tagSize() {
    return this.size === ComponentSize.Large
      ? ComponentSize.Medium
      : ComponentSize.Mini;
  }

  get inputClass() {
    return `${this.bem.element('input', {
      hidden: this.inaction,
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
      tap(options => (this.hasDisabledOption = options.some(o => o.disabled))),
      publishRef(),
    );
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.selectAllStatus$ = combineLatest([
      this.allOptions$,
      this.filterString$,
    ]).pipe(
      switchMap(([allOptions]) =>
        combineLatest(
          (allOptions ?? [])
            .filter(({ visible, disabled }) => visible && !disabled)
            .map(({ selected$ }) => selected$),
        ),
      ),
      map(statuses => {
        const selected = statuses.filter(Boolean);
        return selected.length === 0
          ? SelectAllStatus.Empty
          : selected.length === statuses.length
          ? SelectAllStatus.Checked
          : SelectAllStatus.Indeterminate;
      }),
      startWith(SelectAllStatus.Empty),
      tap(selectAllStatus => (this.selectAllStatus = selectAllStatus)),
      publishRef(),
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

  onVisibleOptions(visible: boolean) {
    if (visible) {
      super.onShowOptions();
      this.inputRef.nativeElement.focus();
    } else {
      super.onHideOptions();
      this.inputRef.nativeElement.value = '';
      this.renderer.removeStyle(this.inputRef.nativeElement, 'width');
    }
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
      this.model.length > 0 &&
      !this.hasDisabledOption // Disabled backspace when any of select options have disabled state.
    ) {
      this.removeValue(this.model.at(-1));
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
        this.model.filter(value => !this.includes(visibleOptionsValue, value)),
      );
    } else {
      this.emitValue(
        this.model.concat(visibleOptionsValue).reduce<T[]>((acc, curr) => {
          if (!this.includes(acc, curr)) {
            acc.push(curr);
          }
          return acc;
        }, []),
      );
    }
  }

  private includes(values: T[], value: T) {
    return values.some(v => this.trackFn(v) === this.trackFn(value));
  }

  protected override valueIn(v: T[]): T[] {
    this.resetInput();
    requestAnimationFrame(() => {
      this.tooltipRef.updatePosition();
    });
    return v || [];
  }

  private resetInput() {
    this.inputRef.nativeElement.value = '';
    this.setInputWidth();
    this.filterString = '';
  }

  // calculate input element width according to its value
  private setInputWidth() {
    const { value } = this.inputRef.nativeElement;
    if (value.length) {
      this.inputValue = value;
      requestAnimationFrame(() => {
        this.renderer.setStyle(
          this.inputRef.nativeElement,
          'width',
          `${this.inputValueMirror.nativeElement.scrollWidth}px`,
        );
      });
    } else {
      this.inputValue = '';
      requestAnimationFrame(() => {
        this.renderer.removeStyle(this.inputRef.nativeElement, 'width');
      });
    }
  }
}
