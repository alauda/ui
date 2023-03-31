import { DomPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
  OnChanges,
  HostBinding,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

import { ComponentSize } from '../../types';
import { Bem, buildBem } from '../../utils';
import { BaseSelect } from '../base-select';

@Component({
  selector: 'aui-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class OptionItemComponent<T> implements OnChanges {
  changes = new Subject();
  bem: Bem = buildBem('aui-option');

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
  disabled: boolean;

  @Input()
  focused: boolean;

  @Input()
  selected: boolean;

  @HostBinding('class.is-group')
  @Input()
  groupTitle: ElementRef;

  @Input()
  contentTemplate: TemplateRef<any>;

  @ViewChild('elRef', { static: true })
  elRef: ElementRef<HTMLDivElement>;

  get groupTitlePortal() {
    return this.groupTitle ? new DomPortal(this.groupTitle) : '';
  }

  _focused = false;
  isMulti = false;
  private readonly select: BaseSelect<T>;
  size: ComponentSize = ComponentSize.Medium;

  size$: Observable<ComponentSize>;

  constructor(
    @Inject(forwardRef(() => BaseSelect))
    select: any, // FIXME: workaround temporarily
  ) {
    this.isMulti = select.isMulti;
    this.select = select;
    this.size$ = this.select.size$.pipe(
      tap(size => {
        this.size = size;
      }),
    );
  }

  ngOnChanges(): void {
    this.changes.next(null);
  }

  onClick() {
    if (this.disabled) {
      return;
    }
    this.select.onOptionClick(this);
  }

  focus() {
    console.log(123);
    if (this.disabled) {
      return;
    }
    this.select.focus(this);
  }

  blur() {
    this.select.blur();
  }
}
