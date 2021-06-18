import { Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

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

  readonly active$: Observable<boolean> = (this._parent
    ? combineLatest([this._parent.active$, this.active$$]).pipe(
        map(([a, b]) => a && b),
      )
    : this.active$$
  ).pipe(distinctUntilChanged());

  constructor(
    @Optional()
    @SkipSelf()
    private readonly _parent: TabContextService,
  ) {}
}
