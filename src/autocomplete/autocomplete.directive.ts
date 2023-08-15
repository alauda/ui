import { Overlay } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  Subject,
  fromEvent,
  merge,
  takeUntil,
  debounceTime,
  startWith,
  distinctUntilChanged,
} from 'rxjs';

import { BaseTooltip, TooltipTrigger, TooltipType } from '../tooltip';
import { scrollIntoView } from '../utils';

import { AutocompleteComponent } from './autocomplete.component';
import { AutoCompleteContext, SuggestionFilterFn } from './autocomplete.types';
import { SuggestionComponent } from './suggestion/suggestion.component';

@Directive({
  selector: 'input[auiAutocomplete],textarea[auiAutocomplete]',
  exportAs: 'auiAutocomplete',
  inputs: ['class:auiAutocompleteClass'],
  host: {
    autocomplete: 'off',
  },
})
export class AutoCompleteDirective
  extends BaseTooltip<AutoCompleteContext>
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input('auiAutocomplete')
  get autocomplete() {
    return this._autocomplete;
  }

  set autocomplete(val) {
    if (val === this._autocomplete) {
      return;
    }
    val.directive$$.next(this);
    this._autocomplete = val;
    this.content = val.template;
  }

  @Input('auiAutocompleteFilterFn')
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

  @Input('auiAutocompleteDefaultFirstSuggestion')
  defaultFirstSuggestion = true;

  @Input('auiAutocompleteTrigger')
  suggestionTrigger: 'auto' | 'input' = 'auto';

  declare innerSelector: string;

  @Output('auiAutocompleteVisibleChange')
  override visibleChange = new EventEmitter<boolean>();

  @Output('auiAutocompleteSelected')
  selected = new EventEmitter<string>();

  // Whether to automatically update input value after selection
  @Input('auiAutocompleteAutoPatch')
  autoPatch = true;

  private _autocomplete: AutocompleteComponent;
  private focusedSuggestion: SuggestionComponent;

  private readonly inputValue$$ = new BehaviorSubject<string>('');
  private readonly filterFn$$ = new BehaviorSubject<SuggestionFilterFn>(
    this.filterFn,
  );

  private readonly unsubscribe$ = new Subject<void>();

  inputValue$: Observable<string> = this.inputValue$$
    .asObservable()
    .pipe(distinctUntilChanged());

  filterFn$: Observable<SuggestionFilterFn> = this.filterFn$$.asObservable();

  get input(): HTMLInputElement {
    const el = this.elRef.nativeElement;
    return this.innerSelector ? el.querySelector(this.innerSelector) : el;
  }

  constructor(
    overlay: Overlay,
    viewContainerRef: ViewContainerRef,
    elRef: ElementRef<HTMLInputElement>,
    renderer: Renderer2,
    cdr: ChangeDetectorRef,
    ngZone: NgZone,
    @Optional()
    @Host()
    private readonly ngControl: NgControl,
  ) {
    super(overlay, viewContainerRef, elRef, renderer, cdr, ngZone);
    this.type = TooltipType.Plain;
    this.trigger = TooltipTrigger.Manual;
    this.position = 'bottom start';
    this.hideOnClick = true;
  }

  ngOnInit() {
    this.visibleChange.pipe(takeUntil(this.destroy$)).subscribe(visible => {
      this[visible ? 'updateSuggestionsContext' : 'resetFocusedSuggestion']();
    });

    if (this.ngControl) {
      this.ngControl.valueChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((value: string | string[]) => {
          if (!Array.isArray(value)) {
            this.inputValue$$.next(value);
          }
        });

      this.ngControl.statusChanges
        .pipe(startWith(this.ngControl.status), takeUntil(this.unsubscribe$))
        .subscribe(status => {
          this.disabled = status === 'DISABLED';
        });
    }
  }

  override ngAfterViewInit() {
    const input = this.input;

    merge(
      fromEvent(this.elRef.nativeElement, 'click'),
      fromEvent(input, 'focus'),
    )
      .pipe(debounceTime(0), takeUntil(this.unsubscribe$))
      .subscribe(() => this.onFocus());

    fromEvent(input, 'blur')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.onBlur());

    fromEvent(input, 'input')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(ev => this.onInput(ev));

    fromEvent<KeyboardEvent>(input, 'keydown')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(ev => this.onKeyDown(ev));
  }

  override ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  override onFocus() {
    if (this.suggestionTrigger === 'auto' && !this.isCreated) {
      super.onFocus();
    }
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue$$.next(value);
    this.show();
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown': {
        this.focusSuggestionDir('down');
        event.stopPropagation();
        event.preventDefault();
        break;
      }
      case 'ArrowUp': {
        this.focusSuggestionDir('up');
        event.stopPropagation();
        event.preventDefault();
        break;
      }
      case 'Enter': {
        if (this.focusedSuggestion) {
          this.selectFocusedOption();
          event.stopPropagation();
          event.preventDefault();
        }
        break;
      }
      case 'Escape': {
        this.hide();
        event.stopPropagation();
        event.preventDefault();
        break;
      }
    }
  }

  updateSuggestionsContext() {
    this.context = {
      ...this.context,
      width: this.elRef.nativeElement.offsetWidth + 'px',
    };
  }

  onSuggestionClick(value: string) {
    let isArrCtrl = false;

    if (this.autoPatch) {
      if (this.ngControl) {
        const { control } = this.ngControl;
        isArrCtrl = Array.isArray(control.value);
        control.patchValue(isArrCtrl ? [...control.value, value] : value);
      } else {
        this.input.value = value;
      }
    }

    this.inputValue$$.next(isArrCtrl ? '' : value);

    this.selected.emit(value);
    this.hide();
  }

  override show() {
    super.show();
    this.autoFocusFirstSuggestion();
  }

  autoFocusFirstSuggestion() {
    const selectedSuggestion = this.autocomplete.suggestions.find(
      suggestion => suggestion.selected,
    );
    if (selectedSuggestion) {
      this.resetFocusedSuggestion(selectedSuggestion);
      requestAnimationFrame(() => {
        this.scrollToSuggestion(selectedSuggestion);
      });
    } else if (this.defaultFirstSuggestion) {
      const firstFocusableSuggestion = this.autocomplete.suggestions.find(
        suggestion => suggestion.visible && !suggestion.disabled,
      );
      this.resetFocusedSuggestion(firstFocusableSuggestion);
      if (firstFocusableSuggestion) {
        requestAnimationFrame(() => {
          this.scrollToSuggestion(firstFocusableSuggestion);
        });
      }
    }
  }

  private focusSuggestionDir(dir: 'down' | 'up') {
    if (!this.isCreated) {
      this.show();
      return;
    }
    const visibleSuggestions = this.autocomplete.suggestions.filter(
      suggestion => suggestion.visible && !suggestion.disabled,
    );
    if (visibleSuggestions.length === 0) {
      return;
    }
    const step = dir === 'down' ? 1 : -1;
    let i = visibleSuggestions.indexOf(this.focusedSuggestion);
    i = i + step;
    if (i >= visibleSuggestions.length) {
      i = 0;
    } else if (i < 0) {
      i = visibleSuggestions.length - 1;
    }
    this.resetFocusedSuggestion(visibleSuggestions[i]);
    this.scrollToSuggestion(this.focusedSuggestion);
  }

  private resetFocusedSuggestion(
    focusedSuggestion: SuggestionComponent = null,
  ) {
    if (this.focusedSuggestion) {
      this.focusedSuggestion.blur();
    }
    this.focusedSuggestion = focusedSuggestion;
    if (this.focusedSuggestion) {
      this.focusedSuggestion.focus();
    }
  }

  private scrollToSuggestion(suggestion: SuggestionComponent) {
    if (this.autocomplete.suggestionListRef) {
      scrollIntoView(
        this.autocomplete.suggestionListRef.nativeElement,
        suggestion.elRef.nativeElement,
      );
    }
  }

  protected selectFocusedOption() {
    if (this.focusedSuggestion) {
      this.onSuggestionClick(this.focusedSuggestion.value);
    }
  }

  private _filterFn(inputValue: string, suggestion: string) {
    return suggestion?.toLowerCase().includes(inputValue?.toLowerCase() ?? '');
  }
}

@Directive({
  selector: '[auiAutocomplete]:not(input):not(textarea)',
  exportAs: 'auiAutocomplete',
  inputs: ['class:auiAutocompleteClass'],
  host: {
    autocomplete: 'off',
  },
})
export class CustomAutoCompleteDirective extends AutoCompleteDirective {
  @Input('auiAutocompleteInnerSelector')
  override innerSelector = 'input,textarea';
}
