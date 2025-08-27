import { AsyncPipe } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { Observable, combineLatest, of, map, startWith, switchMap } from 'rxjs';

import { publishRef } from '../../internal/utils';
import { SuggestionComponent } from '../suggestion/suggestion.component';

@Component({
  selector: 'aui-suggestion-group',
  templateUrl: './suggestion-group.component.html',
  styleUrls: ['./suggestion-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  imports: [AsyncPipe],
})
export class SuggestionGroupComponent implements AfterContentInit {
  @ContentChildren(forwardRef(() => SuggestionComponent))
  suggestions: QueryList<SuggestionComponent>;

  hasVisibleSuggestion$: Observable<boolean>;

  ngAfterContentInit() {
    this.hasVisibleSuggestion$ = this.suggestions.changes.pipe(
      startWith(this.suggestions),
      switchMap((options: QueryList<SuggestionComponent>) =>
        options.length > 0
          ? combineLatest(options.map(node => node.visible$))
          : of([false]),
      ),
      map(visible => visible.some(Boolean)),
      publishRef(),
    );
  }
}
