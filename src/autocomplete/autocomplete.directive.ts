// tslint:disable: no-output-rename
import { Overlay } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
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
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  BaseTooltip,
  TooltipTrigger,
  TooltipType,
} from '../tooltip/public-api';
import { scrollIntoView } from '../utils/scroll-into-view';

import { AutocompleteComponent } from './autocomplete.component';
import { AutoCompleteContext, SuggestionFilterFn } from './autocomplete.types';
import { SuggestionComponent } from './suggestion/suggestion.component';

@Directive({
  selector: 'input[auiAutocomplete],textarea[auiAutocomplete]',
  exportAs: 'auiAutocomplete',
  host: {
    autocomplete: 'off',
  },
})
export class AutoCompleteDirective extends BaseTooltip
  implements OnInit, OnDestroy {
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

  @Input('auiAutocompleteClass')
  class: string;

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

  @Output('auiAutocompleteShow')
  show: EventEmitter<void>;

  @Output('auiAutocompleteHide')
  hide: EventEmitter<void>;

  readonly type: TooltipType = TooltipType.Plain;
  readonly trigger: TooltipTrigger = TooltipTrigger.Focus;
  readonly position = 'bottom start';
  readonly hideOnClick = true;
  context: AutoCompleteContext;

  private _autocomplete: AutocompleteComponent;
  private focusedSuggestion: SuggestionComponent;

  private readonly inputValue$$ = new BehaviorSubject<string>('');
  private readonly filterFn$$ = new BehaviorSubject<SuggestionFilterFn>(
    this.filterFn,
  );

  private readonly unsubscribe$ = new Subject<void>();

  inputValue$: Observable<string> = this.inputValue$$.asObservable();
  filterFn$: Observable<SuggestionFilterFn> = this.filterFn$$.asObservable();

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
  }

  ngOnInit() {
    this.show.subscribe(() => {
      this.updateSuggestionsContext();
    });
    this.hide.subscribe(() => {
      this.resetFocusedSuggestion();
    });

    if (this.ngControl) {
      this.ngControl.valueChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(value => {
          this.inputValue$$.next(value);
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFocus() {
    if (this.suggestionTrigger === 'auto') {
      super.onFocus();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue$$.next(value);
    this.createTooltip();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        this.focusSuggestionDir('down');
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.focusSuggestionDir('up');
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'Enter':
        if (this.focusedSuggestion) {
          this.selectFocusedOption();
          event.stopPropagation();
          event.preventDefault();
        }
        break;
      case 'Escape':
        this.disposeTooltip();
        event.stopPropagation();
        event.preventDefault();
        break;
    }
  }

  updateSuggestionsContext() {
    this.context = {
      ...this.context,
      width: this.elRef.nativeElement.offsetWidth + 'px',
    };
  }

  onSuggestionClick(value: string) {
    if (this.ngControl) {
      this.ngControl.control.patchValue(value);
    } else {
      this.elRef.nativeElement.value = value;
    }
    this.inputValue$$.next(value);
    this.disposeTooltip();
  }

  createTooltip() {
    super.createTooltip();
    this.autoFocusFirstSuggestion();
  }

  private autoFocusFirstSuggestion() {
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
      this.createTooltip();
      return;
    }
    const visibleSuggestions = this.autocomplete.suggestions.filter(
      suggestion => suggestion.visible && !suggestion.disabled,
    );
    if (visibleSuggestions.length === 0) {
      return;
    }
    const step = dir === 'down' ? 1 : -1;
    let i = visibleSuggestions.findIndex(
      option => option === this.focusedSuggestion,
    );
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
    return suggestion.includes(inputValue);
  }
}
