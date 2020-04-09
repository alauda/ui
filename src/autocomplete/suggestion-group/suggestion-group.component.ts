import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import {
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { SuggestionComponent } from '../suggestion/suggestion.component';

@Component({
  selector: 'aui-suggestion-group',
  templateUrl: './suggestion-group.component.html',
  styleUrls: ['./suggestion-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class SuggestionGroupComponent implements AfterContentInit {
  @ContentChildren(forwardRef(() => SuggestionComponent))
  suggestions: QueryList<SuggestionComponent>;

  hasVisibleSuggestion$: Observable<boolean>;

  ngAfterContentInit() {
    this.hasVisibleSuggestion$ = (this.suggestions.changes as Observable<
      QueryList<SuggestionComponent>
    >).pipe(
      startWith(this.suggestions),
      switchMap(options => {
        if (options.length > 0) {
          return combineLatest(options.map(node => node.visible$));
        } else {
          return of([false]);
        }
      }),
      map(values => values.some(value => !!value)),
      publishReplay(1),
      refCount(),
    );
  }
}
