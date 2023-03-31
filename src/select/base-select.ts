import {
  AfterContentInit,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  switchMap,
  takeUntil,
  merge,
  startWith,
} from 'rxjs';

import { CommonFormControl } from '../form';
import { VirtualScrollViewportComponent } from '../scrolling/virtual-scroll-viewport.component';
import { TooltipDirective } from '../tooltip';
import { ComponentSize } from '../types';
import {
  coerceAttrBoolean,
  coerceString,
  isTemplateRef,
  publishRef,
  scrollIntoView,
} from '../utils';

import {
  OptionContentDirective,
  OptionItemCustomDirective,
} from './helper-directives';
import { OptionItemComponent } from './option-item/option-item.component';
import { OptionComponent } from './option.component';
import {
  CreateFn,
  DisplayOption,
  OptionFilterFn,
  SelectFilterOption,
  TrackFn,
} from './select.types';

export const itemSizeMap = {
  [ComponentSize.Large]: 40,
  [ComponentSize.Medium]: 32,
  [ComponentSize.Small]: 28,
  [ComponentSize.Mini]: 26,
  [ComponentSize.Empty]: 32,
};

@Directive()
export abstract class BaseSelect<T, V = T>
  extends CommonFormControl<V>
  implements AfterContentInit, AfterViewInit, OnDestroy
{
  @Input()
  get size() {
    return this._size;
  }

  set size(val) {
    if (!val || this._size === val) {
      return;
    }
    this._size = val;
    this.size$$.next(val);
  }

  @Input()
  get options() {
    return this._options;
  }

  set options(val: Array<SelectFilterOption<T>>) {
    this._options = val;
    this.options$$.next(val);
  }

  @Input()
  get filterable() {
    return this._filterable;
  }

  set filterable(val: boolean | '') {
    this._filterable = coerceAttrBoolean(val);
  }

  @Input()
  get clearable() {
    return this._clearable;
  }

  set clearable(val: boolean | '') {
    this._clearable = coerceAttrBoolean(val);
  }

  @Input()
  get allowCreate() {
    return this._allowCreate;
  }

  set allowCreate(val: boolean | '') {
    this._allowCreate = coerceAttrBoolean(val);
  }

  @Input()
  filterFn: OptionFilterFn<T> = this._filterFn.bind(this);

  @Input()
  trackFn: TrackFn<T> = this._trackFn;

  @Input()
  labelFn?: (value: T) => string;

  @Input()
  loading = false;

  @Input()
  placeholder = '';

  @Input()
  defaultFirstOption = true;

  @Input()
  lazy = true;

  // TODO
  // 1. 还不完全支持多选（输入框中大量的tag）
  // 2. 还不完全支持group（group高度和item不一致）
  @Input()
  useVirtual: boolean;

  @Input()
  // TODO 还不支持动态高度的option
  itemSize: number;

  @Input()
  maxItemLength = 10;

  @Input()
  createFn: CreateFn<T> = this._createFn;

  @Output()
  filterChange = new EventEmitter<string>();

  @Output()
  show = new EventEmitter<void>();

  @Output()
  hide = new EventEmitter<void>();

  @ViewChild('selectRef', { static: true })
  protected selectRef: ElementRef<HTMLElement>;

  @ViewChild('tooltipRef', { static: true })
  protected tooltipRef: TooltipDirective;

  @ViewChild('optionListRef', { static: false })
  protected optionListRef: ElementRef<HTMLDivElement>;

  @ViewChild(VirtualScrollViewportComponent)
  virtualScrollViewport!: VirtualScrollViewportComponent;

  // 可以传入自定义optionItem，级别最高
  @ContentChild(OptionItemCustomDirective, { read: TemplateRef })
  inputItemTemplate: TemplateRef<any>;

  @ViewChildren(OptionItemComponent, { read: ElementRef })
  contentOptionItems: QueryList<ElementRef>;

  // TODO 这个用法有问题
  @ContentChild(OptionContentDirective)
  protected optionContent?: OptionContentDirective;

  // TODO 应该删除OptionComponent
  @ContentChildren(OptionComponent, { descendants: true })
  contentTplOptions: QueryList<OptionComponent<T>>;

  get opened() {
    return this.tooltipRef.isCreated;
  }

  get inputReadonly() {
    return !(this.filterable && this.opened);
  }

  get _itemSize() {
    return this.itemSize || itemSizeMap[this.size];
  }

  get filterString() {
    return this._filterString;
  }

  set filterString(val) {
    if (val !== this._filterString) {
      this._filterString = val;
      this.filterString$$.next(val);
      this.filterChange.emit(val);
    }
  }

  isTemplateRef = isTemplateRef;
  isMulti = false;
  protected scrolledIndex = 0;

  private _size: ComponentSize = ComponentSize.Medium;
  private _options: Array<SelectFilterOption<T>>;
  private _filterable = true;
  private _clearable = false;
  private _allowCreate = false;
  private _filterString = '';
  selectableOptions: Array<DisplayOption<T>> = [];

  /**
   * Utility field to make sure the users always see the value as type array
   */
  abstract readonly values$: Observable<T[]>;
  protected contentOptions$: Observable<Array<DisplayOption<T>>>;
  protected customOptions$: Observable<Array<DisplayOption<T>>>;
  protected inputtingOption$: Observable<DisplayOption<T>>;
  containerWidth: string;

  protected destroy$$ = new Subject<void>();
  protected size$$ = new BehaviorSubject<ComponentSize>(this.size);
  protected options$$ = new BehaviorSubject<Array<DisplayOption<T>>>(null);
  private readonly filterString$$ = new BehaviorSubject<string>(
    this.filterString,
  );

  size$ = this.size$$.asObservable();
  options$ = this.options$$.asObservable();
  filterString$ = this.filterString$$.asObservable();
  allOptions$ = new BehaviorSubject<Array<DisplayOption<T>>>([]);
  filterOptions$ = new BehaviorSubject<Array<DisplayOption<T>>>([]);
  focused$ = new BehaviorSubject<DisplayOption<T>>(null);

  trackByValue = (_: number, item: SelectFilterOption<T>) =>
    this.trackFn(item.value);

  ngAfterContentInit() {
    this.contentOptions$ = this.options$.pipe(
      switchMap(options => {
        if (options?.length) {
          return this.options$;
        }
        return combineLatest([
          this.values$,
          merge(
            ...this.contentTplOptions.map(contentTpl => contentTpl.changes),
            this.contentTplOptions.changes,
          ).pipe(startWith(this.contentTplOptions)),
        ]).pipe(
          map(([values]) => {
            const contents: Array<DisplayOption<T>> = [];
            let lastGroupTitle: ElementRef;
            this.contentTplOptions.toArray().forEach(com => {
              const {
                value,
                label,
                disabled,
                groupTitle,
                labelContext,
                template,
              } = com;
              if (lastGroupTitle !== groupTitle) {
                lastGroupTitle = groupTitle;
                contents.push({
                  value,
                  groupTitle,
                });
              }
              contents.push({
                value,
                label,
                disabled,
                labelContext,
                selected: this.getSelected(value, values),
                contentTemplate: template,
              } as DisplayOption<T>);
            });
            return contents;
          }),
        );
      }),
      publishRef(),
    );
  }

  ngAfterViewInit() {
    this.inputtingOption$ = this.filterString$.pipe(
      map(filterString => {
        if (filterString && this.allowCreate) {
          return this.createFn(filterString);
        }
      }),
      publishRef(),
    );

    this.customOptions$ = combineLatest([
      this.values$,
      this.contentOptions$,
    ]).pipe(
      map(([values, options]) => {
        if (!this.allowCreate) {
          return [];
        }
        const optionKeys = new Set(
          options.map(option => this.trackFn(option.value)),
        );
        return values.reduce<Array<DisplayOption<T>>>((acc, value) => {
          if (!optionKeys.has(this.trackFn(value))) {
            const label =
              this.labelFn?.(value) || coerceString(this.trackFn(value));
            if (label) {
              acc.push({
                label,
                value,
                selected: true,
              });
            }
          }
          return acc;
        }, []);
      }),
      publishRef(),
    );

    combineLatest([
      this.inputtingOption$,
      this.customOptions$,
      this.contentOptions$,
    ])
      .pipe(
        map(([inputtingOption, customOptions, contentOptions]) => {
          const arr = [...customOptions, ...contentOptions];
          if (inputtingOption) {
            arr.unshift(inputtingOption);
          }
          this.allOptions$.next(arr);
        }),
      )
      .subscribe();

    combineLatest([this.allOptions$, this.filterString$])
      .pipe(takeUntil(this.destroy$$))
      .subscribe(([options, filterString]) => {
        options = options.filter(option => this.filterFn(filterString, option));
        this.filterOptions$.next(options);
      });

    this.filterOptions$.pipe(takeUntil(this.destroy$$)).subscribe(options => {
      this.selectableOptions = options.filter(option => !option.disabled);
    });
  }

  ngOnDestroy() {
    this.optionContent?.detach();
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  openOption() {
    this.tooltipRef.createTooltip();
  }

  closeOption() {
    this.tooltipRef.disposeTooltip();
  }

  onShowOptions() {
    const exec = () => {
      this.containerWidth = this.selectRef.nativeElement.offsetWidth + 'px';

      requestAnimationFrame(() => {
        this.autoFocusFirstOption();
      });

      this.show.emit();
    };

    if (this.optionContent) {
      requestAnimationFrame(() => {
        this.optionContent.attach();
        exec();
      });
    } else {
      exec();
    }
  }

  onHideOptions() {
    if (this.onTouched) {
      this.onTouched();
    }
    if (!this.lazy) {
      this.optionContent?.detach();
    }
    this.resetFocusedOption();
    this.filterString = '';
    this.hide.emit();
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterString = value;

    requestAnimationFrame(() => {
      this.autoFocusFirstOption();
    });

    this.cdr.markForCheck();
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        this.focusOptionDir('down');
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.focusOptionDir('up');
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'Enter':
        this.selectFocusedOption();
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'Escape':
        this.escSelect();
        event.stopPropagation();
        event.preventDefault();
        break;
    }
  }

  onOptionClick(option: OptionItemComponent<T>) {
    this.resetFocusedOption(option);
    this.selectOption(option);
  }

  updateAllOptions(option: DisplayOption<T>) {
    const allOptions = this.allOptions$.getValue();
    allOptions.find(_option => _option.value === option.value).selected =
      !option.selected;
    this.allOptions$.next(allOptions);
  }

  protected autoFocusFirstOption() {
    const first =
      this.selectableOptions.find(option => option.selected) ||
      this.selectableOptions[0];
    if (this.defaultFirstOption) {
      this.resetFocusedOption(first);
    } else {
      this.scrollToOption(first);
    }
  }

  protected focusOptionDir(dir: 'down' | 'up') {
    if (!this.opened) {
      this.openOption();
      return;
    }

    if (this.selectableOptions.length === 0) {
      return;
    }
    const step = dir === 'down' ? 1 : -1;
    let i = this.selectableOptions.findIndex(option =>
      this.isFocus(option.value),
    );
    i = i + step;
    if (i >= this.selectableOptions.length) {
      i = 0;
    } else if (i < 0) {
      i = this.selectableOptions.length - 1;
    }
    this.resetFocusedOption(this.selectableOptions[i]);
  }

  isFocus = (
    value: DisplayOption<T>['value'],
    focusOption?: DisplayOption<T>,
  ) => {
    const _focusOption = focusOption || this.focused$.getValue();
    return (
      _focusOption && this.trackFn(_focusOption.value) === this.trackFn(value)
    );
  };

  protected resetFocusedOption(focusedOption?: DisplayOption<T>) {
    if (focusedOption?.value) {
      this.focused$.next(focusedOption);
      this.scrollToOption(focusedOption);
    }
  }

  onScrolledIndexChange(index: number) {
    this.scrolledIndex = index;
  }

  protected scrollToOption(option: DisplayOption<T>) {
    const index = this.filterOptions$
      .getValue()
      .findIndex(
        item => this.trackFn(item.value) === this.trackFn(option.value),
      );
    if (!this.virtualScrollViewport) {
      if (this.contentOptionItems.get(index)) {
        scrollIntoView(
          this.optionListRef.nativeElement,
          this.contentOptionItems.get(index).nativeElement,
        );
      }
      return;
    }
    if (
      index < this.scrolledIndex ||
      index >= this.scrolledIndex + this.maxItemLength
    ) {
      this.virtualScrollViewport.scrollToIndex(index || 0);
    }
  }

  protected selectFocusedOption() {
    if (!this.opened) {
      this.openOption();
      return;
    }
    let focusedOption = this.focused$.getValue();
    if (focusedOption) {
      // 更新聚焦的option，例如：focus某一项后一直按enter键
      focusedOption = this.selectableOptions.find(
        option =>
          this.trackFn(option.value) === this.trackFn(focusedOption.value),
      );
      focusedOption && this.selectOption(focusedOption);
    }
  }

  getSelected(
    value: DisplayOption<T>['value'],
    values: Array<DisplayOption<T>['value']>,
  ) {
    return values.some(item => this.trackFn(item) === this.trackFn(value));
  }

  focus(option: DisplayOption<T>) {
    this.focused$.next(option);
  }

  blur() {
    this.focused$.next(null);
  }

  getLabelByValue(value: T) {
    return this.labelFn?.(value) || coerceString(this.trackFn(value));
  }

  protected escSelect() {
    this.closeOption();
  }

  private _trackFn<T>(value: T) {
    return value;
  }

  private _createFn<T>(input: string) {
    // @ts-ignore
    const value = input as T;
    return {
      value,
    };
  }

  private _filterFn(
    filterString: string,
    { label, value }: SelectFilterOption<T>,
  ) {
    return (
      (typeof label === 'string' && label) ||
      this.labelFn?.(value) ||
      coerceString(this.trackFn(value))
    )
      ?.toLowerCase()
      .includes(filterString?.toLowerCase() ?? '');
  }

  abstract selectOption(option: DisplayOption<T>): void;
  abstract clearValue(event: Event): void;
}
