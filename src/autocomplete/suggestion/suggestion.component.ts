import { AsyncPipe } from '@angular/common';
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
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs';

import { Bem, buildBem, coerceAttrBoolean, publishRef } from '../../utils';
import { AutocompleteComponent } from '../autocomplete.component';

@Component({
  selector: 'aui-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  standalone: true,
  imports: [AsyncPipe],
})
export class SuggestionComponent {
  bem: Bem = buildBem('aui-suggestion');

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

  @Input({ transform: coerceAttrBoolean })
  disabled: boolean;

  @ViewChild('elRef', { static: true })
  elRef: ElementRef;

  selected = false;
  visible = true;
  focused = false;

  selected$: Observable<boolean>;
  visible$: Observable<boolean>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Inject(forwardRef(() => AutocompleteComponent))
    private readonly autocomplete: AutocompleteComponent,
  ) {
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
      publishRef(),
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
        if (!(this.visible = visible)) {
          this.focused = false;
        }
      }),
      publishRef(),
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
