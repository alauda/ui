import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import {
  map,
  publishReplay,
  refCount,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { Bem, buildBem } from '../../utils/bem';
import { coerceAttrBoolean } from '../../utils/coercion';
import { AutocompleteComponent } from '../autocomplete.component';

@Component({
  selector: 'aui-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class SuggestionComponent {
  bem: Bem = buildBem('aui-suggestion');

  private _disabled = false;
  private _value: string;
  private readonly value$$ = new BehaviorSubject<string>(this.value);

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

  @ViewChild('elRef', { static: true })
  elRef: ElementRef;

  selected = false;
  visible = true;
  focused = false;

  private readonly autocomplete: AutocompleteComponent;
  selected$: Observable<boolean>;
  visible$: Observable<boolean>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Inject(forwardRef(() => AutocompleteComponent))
    autocomplete: any, // FIXME: workaround temporarily
  ) {
    this.autocomplete = autocomplete;
    this.selected$ = combineLatest([
      this.autocomplete.directive$$.pipe(
        switchMap(directive => directive.inputValue$),
      ),
      this.value$$,
    ]).pipe(
      map(([inputValue, selfValue]) => inputValue === selfValue),
      tap(selected => {
        this.selected = selected;
      }),
      publishReplay(1),
      refCount(),
    );
    this.visible$ = combineLatest([
      this.autocomplete.directive$$.pipe(
        switchMap(directive => directive.filterFn$),
      ),
      this.autocomplete.directive$$.pipe(
        switchMap(directive => directive.inputValue$),
      ),
      this.value$$,
    ]).pipe(
      map(([filterFn, filterString, suggestion]) =>
        filterFn(filterString, suggestion),
      ),
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
    this.autocomplete.directive$$.pipe(take(1)).subscribe(directive => {
      directive.onSuggestionClick(this.value);
    });
  }

  focus() {
    this.focused = true;
    this.cdr.markForCheck();
  }

  blur() {
    this.focused = false;
    this.cdr.markForCheck();
  }
}
