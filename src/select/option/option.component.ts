import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  publishReplay,
  refCount,
  tap,
} from 'rxjs/operators';

import { ComponentSize } from '../../types';
import { Bem, buildBem, coerceAttrBoolean } from '../../utils';
import { BaseSelect } from '../base-select';

@Component({
  selector: 'aui-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class OptionComponent<T> {
  bem: Bem = buildBem('aui-option');

  private _disabled = false;
  private _label: string | TemplateRef<unknown> = '';
  private _labelContext: unknown = {};
  private _value: T;
  private readonly label$$ = new BehaviorSubject(this.label);

  private readonly labelContext$$ = new BehaviorSubject(this.labelContext);

  private readonly value$$ = new BehaviorSubject(this.value);

  @Input()
  get label() {
    return this._label;
  }

  set label(val) {
    this._label = val;
    this.label$$.next(val);
  }

  @Input()
  get labelContext() {
    return this._labelContext;
  }

  set labelContext(val) {
    this._labelContext = val;
    this.labelContext$$.next(val);
  }

  @Input()
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.value$$.next(val);
  }

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(val: boolean | '') {
    this._disabled = coerceAttrBoolean(val);
  }

  isMulti = false;

  @ViewChild('elRef', { static: true })
  elRef: ElementRef;

  private readonly select: BaseSelect<T>;
  selected = false;
  visible = true;
  size: ComponentSize = ComponentSize.Medium;
  focused = false;

  value$ = this.value$$.asObservable();
  label$ = this.label$$.asObservable();
  labelContext$ = this.labelContext$$.asObservable();

  selected$: Observable<boolean>;
  size$: Observable<ComponentSize>;
  visible$: Observable<boolean>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Inject(forwardRef(() => BaseSelect))
    select: any, // FIXME: workaround temporarily
  ) {
    this.isMulti = select.isMulti;
    this.select = select;
    this.selected$ = combineLatest([this.select.values$, this.value$$]).pipe(
      map(([selectValue, selfValue]) =>
        selectValue
          ?.map(this.select.trackFn)
          .includes(this.select.trackFn(selfValue)),
      ),
      distinctUntilChanged(),
      tap(selected => {
        this.selected = selected;
      }),
      publishReplay(1),
      refCount(),
    );
    this.size$ = this.select.size$.pipe(
      tap(size => {
        this.size = size;
      }),
    );
    this.visible$ = combineLatest([
      this.select.filterString$,
      combineLatest([this.label$, this.value$, this.labelContext$]).pipe(
        map(([label, value, labelContext]) => ({ label, value, labelContext })),
      ),
    ]).pipe(
      map(([filterString, option]) =>
        this.select.filterFn(filterString, option),
      ),
      distinctUntilChanged(),
      tap(visible => {
        this.visible = visible;
      }),
      publishReplay(1),
      refCount(),
    );
  }

  onClick() {
    if (this.disabled) {
      return;
    }
    this.select.onOptionClick(this);
  }

  focus() {
    if (this.disabled) {
      return;
    }
    this.focused = true;
    this.cdr.markForCheck();
  }

  blur() {
    this.focused = false;
    this.cdr.markForCheck();
  }
}
