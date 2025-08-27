import { Injectable, Optional, SkipSelf } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  distinctUntilChanged,
  map,
} from 'rxjs';

@Injectable()
export class TabContextService {
  private readonly active$$ = new BehaviorSubject(false);

  /**
   * Whether the tab is currently active.
   */
  get isActive() {
    return this.active$$.value;
  }

  set isActive(isActive: boolean) {
    this.active$$.next(isActive);
  }

  readonly active$: Observable<boolean>;

  constructor(
    @Optional()
    @SkipSelf()
    readonly _parent: TabContextService,
  ) {
    this.active$ = (
      _parent
        ? combineLatest([_parent.active$, this.active$$]).pipe(
            map(([a, b]) => a && b),
          )
        : this.active$$
    ).pipe(distinctUntilChanged());
  }
}
