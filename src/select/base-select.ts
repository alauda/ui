import {
  AfterContentInit,
  AfterViewInit,
  ContentChildren,
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
import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import {
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { CommonFormControl } from '../form/public-api';
import { TooltipDirective } from '../tooltip/public-api';
import { ComponentSize } from '../types';
import { coerceAttrBoolean } from '../utils/coercion';
import { scrollIntoView } from '../utils/scroll-into-view';

import { OptionComponent } from './option/option.component';
import { OptionFilterFn, TrackFn } from './select.types';

export abstract class BaseSelect<T> extends CommonFormControl<T>
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

  set filterable(val) {
    this._filterable = coerceAttrBoolean(val);
  }

  @Input()
  get clearable() {
    return this._clearable;
  }

  set clearable(val) {
    this._clearable = coerceAttrBoolean(val);
  }

  @Input()
  get filterFn() {
    return this._filterFn;
  }

  set filterFn(val) {
    if (val !== this._filterFn) {
      this._filterFn = val;
      this.filterFn$$.next(val);
    }
  }

  @Input()
  get trackFn() {
    return this._trackFn;
  }

  set trackFn(val) {
    if (val !== this._trackFn) {
      this._trackFn = val;
      this.trackFn$$.next(val);
    }
  }

  @Input()
  get allowCreate() {
    return this._allowCreate;
  }

  set allowCreate(val) {
    this._allowCreate = coerceAttrBoolean(val);
  }

  get allOptions() {
    return [].concat(
      this.customOptions ? this.customOptions.toArray() : [],
      this.contentOptions ? this.contentOptions.toArray() : [],
    );
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

  @Output()
  filterChange = new EventEmitter<string>();

  @Output()
  show = new EventEmitter<void>();

  @Output()
  hide = new EventEmitter<void>();

  @ViewChild('selectRef', { static: true })
  protected selectRef: ElementRef;

  @ViewChild('tooltipRef', { static: true })
  protected tooltipRef: TooltipDirective;

  @ViewChild('optionListRef', { static: true })
  protected optionListRef: ElementRef;

  @ViewChild('inputtingOption', { static: false })
  protected inputtingOption: OptionComponent;

  @ViewChildren(OptionComponent)
  customOptions: QueryList<OptionComponent>;

  @ContentChildren(OptionComponent, { descendants: true })
  contentOptions: QueryList<OptionComponent>;

  /**
   * Utility field to make sure the users always see the value as type array
   */
  abstract readonly values$: Observable<any[]>;

  allOptions$: Observable<OptionComponent[]>;

  protected focusedOption: OptionComponent;

  private _size = ComponentSize.Medium;
  private _filterable = true;
  private _clearable = false;
  private _allowCreate = false;
  private _filterString = '';

  protected destroy$$ = new Subject<void>();
  protected size$$ = new BehaviorSubject<ComponentSize>(this.size);
  private readonly filterString$$ = new BehaviorSubject<string>(
    this.filterString,
  );

  private readonly filterFn$$ = new BehaviorSubject<OptionFilterFn>(
    this.filterFn,
  );

  private readonly trackFn$$ = new BehaviorSubject<TrackFn>(this.trackFn);

  size$: Observable<ComponentSize> = this.size$$.asObservable();
  trackFn$: Observable<TrackFn> = this.trackFn$$.asObservable();
  filterString$: Observable<string> = this.filterString$$.asObservable();
  filterFn$: Observable<OptionFilterFn> = this.filterFn$$.asObservable();
  hasVisibleOption$: Observable<boolean>;
  hasMatchedOption$: Observable<boolean>;
  customCreatedValues$: Observable<string[]>;
  containerWidth: string;

  ngAfterContentInit() {
    this.customCreatedValues$ = combineLatest([
      this.values$,
      (this.contentOptions.changes as Observable<
        QueryList<OptionComponent>
      >).pipe(
        startWith(this.contentOptions),
        switchMap(options =>
          options.length > 0
            ? combineLatest(options.map(option => option.value$))
            : of([]),
        ),
      ),
      this.trackFn$,
    ]).pipe(
      map(([values, optionValues, trackFn]) =>
        values
          .filter(
            value =>
              !optionValues.map(v => trackFn(v)).includes(trackFn(value)),
          )
          .map(value => trackFn(value))
          .filter(value => !!value),
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
      map(([customOptions, contentOptions]) => [
        ...customOptions.toArray(),
        ...contentOptions.toArray(),
      ]),
      publishReplay(1),
      refCount(),
    );

    this.hasMatchedOption$ = combineLatest([
      this.allOptions$.pipe(
        map(customOptions =>
          customOptions.filter(option => option !== this.inputtingOption),
        ),
        // eslint-disable-next-line sonarjs/no-identical-functions
        switchMap(options =>
          options.length > 0
            ? combineLatest(options.map(option => option.value$))
            : of([]),
        ),
      ),
      this.filterString$,
      this.trackFn$,
    ]).pipe(
      map(([values, filterString, trackFn]) =>
        values.some(value => trackFn(value) === filterString),
      ),
      publishReplay(1),
      refCount(),
    );

    this.hasVisibleOption$ = this.contentOptions.changes.pipe(
      startWith(this.contentOptions),
      switchMap((options: QueryList<OptionComponent>) =>
        options.length > 0
          ? combineLatest(options.map(option => option.visible$))
          : of([]),
      ),
      map(visible => visible.some(value => value)),
      publishReplay(1),
      refCount(),
    );
  }

  ngOnDestroy() {
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
    this.containerWidth = this.selectRef.nativeElement.offsetWidth + 'px';
    this.show.emit();

    requestAnimationFrame(() => {
      this.autoFocusFirstOption();
    });
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

  onOptionClick(option: OptionComponent) {
    this.resetFocusedOption(option);
    this.selectOption(option);
  }

  isTemplate(label: string | TemplateRef<any>) {
    return label instanceof TemplateRef;
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
    let i = visibleOptions.findIndex(option => option === this.focusedOption);
    i = i + step;
    if (i >= visibleOptions.length) {
      i = 0;
    } else if (i < 0) {
      i = visibleOptions.length - 1;
    }
    this.resetFocusedOption(visibleOptions[i]);
  }

  protected resetFocusedOption(focusedOption: OptionComponent = null) {
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

  protected scrollToOption(option: OptionComponent) {
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

  private _trackFn(value: any) {
    return value;
  }

  private _filterFn(
    filterString: string,
    option: { label: string | TemplateRef<any>; value: any; labelContext: any },
  ) {
    return (
      (typeof option.label === 'string' && option.label) ||
      option.value + ''
    ).includes(filterString);
  }

  abstract selectOption(option: OptionComponent): void;
  abstract clearValue(event: Event): void;
}
