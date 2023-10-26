import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
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

import { OptionItemCustomDirective } from './helper-directives';
import { OptionItemComponent } from './option-item/option-item.component';
import { OptionComponent } from './option.component';
import {
  CreateFn,
  DisplayOption,
  OptionFilterFn,
  SelectFilterOption,
  TrackFn,
} from './select.types';

const itemSizeMap = {
  [ComponentSize.Large]: 40,
  [ComponentSize.Medium]: 32,
  [ComponentSize.Small]: 28,
  [ComponentSize.Mini]: 26,
  [ComponentSize.Empty]: 32,
};

@Directive({
  standalone: true,
})
export abstract class BaseSelect<T, V = T>
  extends CommonFormControl<V>
  implements AfterContentInit
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

  @Input({ transform: coerceAttrBoolean })
  filterable = true;

  @Input({ transform: coerceAttrBoolean })
  clearable: boolean;

  @Input({ transform: coerceAttrBoolean })
  allowCreate: boolean;

  @Input()
  loading = false;

  @Input()
  placeholder = '';

  @Input()
  defaultFirstOption = true;

  @Input()
  useVirtual: boolean;

  @Input()
  // TODO 还不支持动态高度的option
  itemSize: number;

  @Input()
  maxItemLength = 10;

  @Input()
  createFn: CreateFn<T> = this._createFn;

  @Input()
  filterFn: OptionFilterFn<T> = this._filterFn.bind(this);

  @Input()
  trackFn: TrackFn<T> = this._trackFn;

  @Input()
  labelFn?: (value: T) => string;

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
  // 主要作用是可以在业务里对option附加例如 tooltip 这样的能力
  @ContentChild(OptionItemCustomDirective, { read: TemplateRef })
  inputItemTemplate: TemplateRef<any>;

  @ViewChildren(OptionItemComponent, { read: ElementRef })
  contentOptionItems: QueryList<ElementRef<HTMLElement>>;

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

  set filterString(val) {
    if (val !== this._filterString) {
      this._filterString = val;
      this.filterString$$.next(val);
      this.filterChange.emit(val);
    }
  }

  get filterString() {
    return this._filterString;
  }

  isTemplateRef = isTemplateRef;
  isMulti = false;
  protected scrolledIndex = 0;

  private _size: ComponentSize = ComponentSize.Medium;
  private _options: Array<SelectFilterOption<T>>;
  private _filterString = '';
  selectableOptions: Array<DisplayOption<T>> = [];

  /**
   * Utility field to make sure the users always see the value as type array
   */
  abstract readonly values$: Observable<T[]>;
  // 传入的option数据
  protected options$$ = new BehaviorSubject<Array<DisplayOption<T>>>(null);
  // 最终的option数据
  protected contentOptions$: Observable<Array<DisplayOption<T>>>;
  // 已创建的option数据（仅当支持输入时才有）
  protected customOptions$: Observable<Array<DisplayOption<T>>>;
  // 正在输入（待创建）的option数据
  protected inputtingOption$: Observable<DisplayOption<T>>;
  // 包括输入中、已创建、定义的所有option数据
  allOptions$ = new BehaviorSubject<Array<DisplayOption<T>>>([]);
  // 经过过滤后的option数据
  filterOptions$ = new BehaviorSubject<Array<DisplayOption<T>>>([]);
  containerWidth: string;

  protected size$$ = new BehaviorSubject<ComponentSize>(this.size);
  private readonly filterString$$ = new BehaviorSubject<string>(
    this.filterString,
  );

  size$ = this.size$$.asObservable();
  options$ = this.options$$.asObservable();
  filterString$ = this.filterString$$.asObservable();
  focused$ = new BehaviorSubject<DisplayOption<T>>(null);

  private readonly destroyRef = inject(DestroyRef);

  ngAfterContentInit() {
    this.contentOptions$ = this.options$.pipe(
      switchMap(options => {
        if (options?.length) {
          // 如果有传入的配置则使用传入的配置
          return this.options$;
        }
        // 没有传入的配置则转换 html 写法为配置数据
        return combineLatest([
          this.values$,
          // 单个option或者option列表变都会触发
          merge(
            ...this.contentTplOptions.map(contentTpl => contentTpl.changes$),
            this.contentTplOptions.changes,
          ).pipe(startWith(this.contentTplOptions)),
        ]).pipe(map(([values]) => this.tplOptions2Data(values)));
      }),
      publishRef(),
    );

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

    this.transformOptions();

    this.filterOptions$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(options => {
        this.selectableOptions = options.filter(option => !option.disabled);
      });
  }

  // 将aui-option转为配置数据
  private tplOptions2Data(values: T[]) {
    const contents: Array<DisplayOption<T>> = [];
    let lastGroupTitle: ElementRef;
    // 用最新的option元素列表清洗出配置数据
    this.contentTplOptions.toArray().forEach(com => {
      const {
        value,
        label,
        disabled,
        groupTitle,
        labelContext,
        contentTemplate,
      } = com;
      if (lastGroupTitle !== groupTitle) {
        lastGroupTitle = groupTitle;
        contents.push({
          groupTitle,
        } as DisplayOption<T>);
      }
      contents.push({
        value,
        label,
        disabled,
        labelContext,
        selected: this.getSelected(value, values),
        contentTemplate,
      } as DisplayOption<T>);
    });
    return contents;
  }

  private transformOptions() {
    combineLatest([
      this.inputtingOption$,
      this.customOptions$,
      this.contentOptions$, // todo contentOptions$ 流会触发 customOptions$，所以应该将这两个合并为一次触发
    ])
      .pipe(
        map(([inputtingOption, customOptions, contentOptions]) => {
          const arr = [...customOptions, ...contentOptions];
          if (inputtingOption) {
            arr.unshift(inputtingOption);
          }
          return arr;
        }),
      )
      .subscribe(arr => {
        this.allOptions$.next(arr);
      });

    combineLatest([this.allOptions$, this.filterString$])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(([options, filterString]) => {
          const result: Array<DisplayOption<T>> = [];
          let lastTitleOption: DisplayOption<T>;
          let lastResultLength = 0;
          let lastTitleResultLength = 0;
          options.forEach((option, idx) => {
            // 有待确认的组option
            if (
              lastTitleOption && // 遍历到最后一个了 或者 开始遍历新的组了就进入确认逻辑
              (idx === options.length - 1 ||
                (option.groupTitle && lastTitleOption !== option)) && // 如果记录待确认组时的result长度和当前result长度不一致，也就是增加了，说明组内有符合条件的option，就插入进去
              lastResultLength !== lastTitleResultLength
            ) {
              result.splice(lastTitleResultLength, 0, lastTitleOption);
            }
            if (option.groupTitle) {
              lastTitleResultLength = result.length;
              lastTitleOption = option;
            } else if (this.filterFn(filterString, option)) {
              result.push(option);
            }
            lastResultLength = result.length;
          });
          return result;
        }),
      )
      .subscribe(result => {
        this.filterOptions$.next(result);
      });
  }

  trackByValue = (_: number, item: SelectFilterOption<T>) =>
    this.trackFn(item.value);

  openOption() {
    this.tooltipRef.show();
  }

  closeOption() {
    this.tooltipRef.hide();
  }

  onShowOptions() {
    this.containerWidth = this.selectRef.nativeElement.offsetWidth + 'px';

    requestAnimationFrame(() => {
      this.autoFocusFirstOption();
    });

    this.show.emit();
  }

  onHideOptions() {
    if (this.onTouched) {
      this.onTouched();
    }
    this.resetFocusedOption();
    this.filterString = '';
    this.hide.emit();
  }

  onInput(event: Event) {
    this.filterString = (event.target as HTMLInputElement).value;

    requestAnimationFrame(() => {
      this.autoFocusFirstOption();
    });

    this.cdr.markForCheck();
  }

  stopEvent(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown': {
        this.focusOptionDir('down');
        this.stopEvent(event);
        break;
      }
      case 'ArrowUp': {
        this.focusOptionDir('up');
        this.stopEvent(event);
        break;
      }
      case 'Enter': {
        this.selectFocusedOption();
        this.stopEvent(event);
        break;
      }
      case 'Escape': {
        this.escSelect();
        this.stopEvent(event);
        break;
      }
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
    if (!this.selectableOptions.length) {
      return;
    }
    const first =
      this.selectableOptions.find(option => option.selected) ||
      (this.selectableOptions[0].groupTitle
        ? this.selectableOptions[1]
        : this.selectableOptions[0]);
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

    if (!this.selectableOptions?.length) {
      return;
    }
    const step = dir === 'down' ? 1 : -1;
    let i = this.selectableOptions.findIndex(option =>
      this.isFocus(option.value),
    );
    i = i + step;
    // 如果是groupTitle，就再走一步
    if (this.selectableOptions[i]?.groupTitle) {
      i = i + step;
    }
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
    this.blur();
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
