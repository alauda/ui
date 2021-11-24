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
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import {
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { CommonFormControl } from '../form/public-api';
import { TooltipDirective } from '../tooltip/public-api';
import { ComponentSize } from '../types';
import {
  coerceAttrBoolean,
  coerceString,
  isTemplateRef,
  scrollIntoView,
} from '../utils';

import { OptionContentDirective } from './helper-directives';
import { OptionComponent } from './option/option.component';
import { OptionFilterFn, SelectFilterOption, TrackFn } from './select.types';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseSelect<T, V = T>
  extends CommonFormControl<V>
  implements AfterContentInit, AfterViewInit, OnDestroy {
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
  filterFn: OptionFilterFn<T> = this._filterFn.bind(this);

  @Input()
  trackFn: TrackFn<T> = this._trackFn;

  @Input()
  labelFn?: (value: T) => string;

  @Input()
  get allowCreate() {
    return this._allowCreate;
  }

  set allowCreate(val: boolean | '') {
    this._allowCreate = coerceAttrBoolean(val);
  }

  get allOptions() {
    return [
      ...(this.customOptions ? this.customOptions.toArray() : []),
      ...(this.contentOptions ? this.contentOptions.toArray() : []),
    ];
  }

  get opened() {
    return this.tooltipRef.isCreated;
  }

  get inputReadonly() {
    return !(this.filterable && this.opened);
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

  @Input()
  loading = false;

  @Input()
  placeholder = '';

  @Input()
  defaultFirstOption = true;

  @Input()
  lazy = true;

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
  protected optionListRef: ElementRef;

  @ViewChild('inputtingOption', { static: false })
  protected inputtingOption: OptionComponent<T>;

  @ContentChild(OptionContentDirective)
  protected optionContent?: OptionContentDirective;

  @ViewChildren(OptionComponent)
  customOptions: QueryList<OptionComponent<T>>;

  @ContentChildren(OptionComponent, { descendants: true })
  contentOptions: QueryList<OptionComponent<T>>;

  isTemplateRef = isTemplateRef;

  /**
   * Utility field to make sure the users always see the value as type array
   */
  abstract readonly values$: Observable<T[]>;

  allOptions$: Observable<Array<OptionComponent<T>>>;

  protected focusedOption: OptionComponent<T>;

  private _size: ComponentSize = ComponentSize.Medium;
  private _filterable = true;
  private _clearable = false;
  private _allowCreate = false;
  private _filterString = '';

  protected destroy$$ = new Subject<void>();
  protected size$$ = new BehaviorSubject<ComponentSize>(this.size);
  private readonly filterString$$ = new BehaviorSubject<string>(
    this.filterString,
  );

  size$ = this.size$$.asObservable();
  filterString$ = this.filterString$$.asObservable();
  hasVisibleOption$: Observable<boolean>;
  hasMatchedOption$: Observable<boolean>;
  customCreatedOptions$: Observable<Array<SelectFilterOption<T>>>;
  containerWidth: string;

  ngAfterContentInit() {
    this.customCreatedOptions$ = combineLatest([
      this.values$,
      this.contentOptions.changes.pipe(
        startWith(this.contentOptions),
        switchMap((options: QueryList<OptionComponent<T>>) =>
          options.length > 0
            ? combineLatest(options.map(option => option.value$))
            : of([] as T[]),
        ),
      ),
    ]).pipe(
      map(([values, optionValues]) =>
        values.reduce<Array<SelectFilterOption<T>>>((acc, value) => {
          const included = optionValues
            .map(value => this.trackFn(value))
            .includes(this.trackFn(value));
          if (!included) {
            const label =
              this.labelFn?.(value) || coerceString(this.trackFn(value));
            if (label) {
              acc.push({
                label,
                value,
              });
            }
          }
          return acc;
        }, []),
      ),
      publishReplay(1),
      refCount(),
    );
  }

  ngAfterViewInit() {
    this.allOptions$ = combineLatest([
      this.customOptions.changes.pipe(startWith(this.customOptions)),
      this.contentOptions.changes.pipe(startWith(this.contentOptions)),
    ]).pipe(
      map(
        ([customOptions, contentOptions]: [
          QueryList<OptionComponent<T>>,
          QueryList<OptionComponent<T>>,
        ]) => [...customOptions.toArray(), ...contentOptions.toArray()],
      ),
      publishReplay(1),
      refCount(),
    );

    // support dynamic options loading on filtering
    this.allOptions$.pipe(takeUntil(this.destroy$$)).subscribe(() => {
      if (this.opened) {
        this.autoFocusFirstOption();
      }
    });

    this.hasMatchedOption$ = combineLatest([
      this.allOptions$.pipe(
        map(customOptions =>
          customOptions.filter(option => option !== this.inputtingOption),
        ),
        // eslint-disable-next-line sonarjs/no-identical-functions
        switchMap(options =>
          options.length > 0
            ? combineLatest(options.map(option => option.value$))
            : of([] as T[]),
        ),
      ),
      this.filterString$,
    ]).pipe(
      map(([values, filterString]) =>
        values.some(value => this.trackFn(value) === filterString),
      ),
      publishReplay(1),
      refCount(),
    );

    this.hasVisibleOption$ = this.contentOptions.changes.pipe(
      startWith(this.contentOptions),
      switchMap((options: QueryList<OptionComponent<T>>) =>
        options.length > 0
          ? combineLatest(options.map(option => option.visible$))
          : of([] as boolean[]),
      ),
      map(visible => visible.some(value => value)),
      publishReplay(1),
      refCount(),
    );
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

  onOptionClick(option: OptionComponent<T>) {
    this.resetFocusedOption(option);
    this.selectOption(option);
  }

  protected autoFocusFirstOption() {
    if (this.defaultFirstOption && this.allowCreate && this.filterString) {
      const matchedOption = this.contentOptions.find(
        option => this.trackFn(option.value) === this.filterString,
      );
      this.resetFocusedOption(matchedOption || this.customOptions.first);
      return;
    }

    const selectedOption = this.allOptions.find(
      option => option.selected && option.visible,
    );
    if (this.defaultFirstOption) {
      this.resetFocusedOption(
        selectedOption ||
          this.allOptions.find(option => option.visible && !option.disabled),
      );
    } else if (selectedOption) {
      this.scrollToOption(selectedOption);
    }
  }

  protected focusOptionDir(dir: 'down' | 'up') {
    if (!this.opened) {
      this.openOption();
      return;
    }
    const visibleOptions = this.allOptions.filter(
      option => option.visible && !option.disabled,
    );
    if (visibleOptions.length === 0) {
      return;
    }
    const step = dir === 'down' ? 1 : -1;
    let i = visibleOptions.indexOf(this.focusedOption);
    i = i + step;
    if (i >= visibleOptions.length) {
      i = 0;
    } else if (i < 0) {
      i = visibleOptions.length - 1;
    }
    this.resetFocusedOption(visibleOptions[i]);
  }

  protected resetFocusedOption(focusedOption?: OptionComponent<T>) {
    if (this.focusedOption === focusedOption) {
      return;
    }

    if (this.focusedOption) {
      this.focusedOption.blur();
    }

    this.focusedOption = focusedOption;

    if (this.focusedOption) {
      this.focusedOption.focus();
      this.scrollToOption(this.focusedOption);
    }
  }

  protected scrollToOption(option: OptionComponent<T>) {
    if (this.optionListRef) {
      scrollIntoView(
        this.optionListRef.nativeElement,
        option.elRef.nativeElement,
      );
    }
  }

  protected selectFocusedOption() {
    if (!this.opened) {
      this.openOption();
      return;
    }
    if (this.focusedOption) {
      this.selectOption(this.focusedOption);
    }
  }

  protected escSelect() {
    this.closeOption();
  }

  private _trackFn<T>(value: T) {
    return value;
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

  abstract selectOption(option: OptionComponent<T>): void;
  abstract clearValue(event: Event): void;
}
