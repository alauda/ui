import { AsyncPipe } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  Observable,
  ReplaySubject,
  combineLatest,
  of,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

import { publishRef } from '../internal/utils';

import { AutocompletePlaceholderComponent } from './autocomplete-placeholder.component';
import { AutoCompleteDirective } from './autocomplete.directive';
import { SuggestionComponent } from './suggestion/suggestion.component';

@Component({
  selector: 'aui-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  imports: [AsyncPipe],
})
export class AutocompleteComponent implements AfterContentInit {
  @ContentChildren(SuggestionComponent, { descendants: true })
  suggestions: QueryList<SuggestionComponent>;

  @ContentChildren(AutocompletePlaceholderComponent)
  placeholder: QueryList<AutocompletePlaceholderComponent>;

  @ViewChild(TemplateRef, { static: true })
  template: TemplateRef<any>;

  @ViewChild('suggestionListRef', { static: true })
  suggestionListRef: ElementRef;

  hasVisibleSuggestion$: Observable<boolean>;
  hasContent$: Observable<boolean>;
  visibles$: Observable<boolean[]>;

  directive$$ = new ReplaySubject<AutoCompleteDirective>(1);

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.visibles$ = this.suggestions.changes.pipe(
      startWith(this.suggestions),
      switchMap((suggestions: QueryList<SuggestionComponent>) =>
        suggestions.length > 0
          ? combineLatest(suggestions.map(suggestion => suggestion.visible$))
          : of([] as boolean[]),
      ),
      publishRef(),
    );

    this.hasVisibleSuggestion$ = this.visibles$.pipe(
      debounceTime(0),
      map(visible => visible.some(Boolean)),
      withLatestFrom(this.directive$$),
      map(([hasVisibleSuggestion, directive]) => {
        if (hasVisibleSuggestion && directive.defaultFirstSuggestion) {
          directive.autoFocusFirstSuggestion();
        }
        return hasVisibleSuggestion;
      }),
      distinctUntilChanged(),
      tap(() => this.cdr.markForCheck()),
      publishRef(),
    );

    this.hasContent$ = combineLatest([
      this.hasVisibleSuggestion$,
      this.placeholder.changes.pipe(
        startWith(this.placeholder),
        map(
          (list: QueryList<AutocompletePlaceholderComponent>) => !!list.length,
        ),
      ),
    ]).pipe(
      map(
        ([hasVisibleSuggestion, hasPlaceholder]) =>
          hasVisibleSuggestion || hasPlaceholder,
      ),
      distinctUntilChanged(),
    );

    combineLatest([this.directive$$, this.visibles$])
      .pipe(debounceTime(50))
      .subscribe(([directive]) => {
        directive.overlayRef?.updatePosition();
      });
  }
}
