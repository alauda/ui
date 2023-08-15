// Original code from material2

import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  isDevMode,
} from '@angular/core';
import { Subject } from 'rxjs';

import {
  getSortDuplicateSortableIdError,
  getSortHeaderMissingIdError,
  getSortInvalidDirectionError,
} from './sort-errors';
import { Sort, SortDirection, Sortable } from './sort.types';

@Directive({
  selector: '[auiSort]',
  exportAs: 'auiSort',
})
export class SortDirective implements OnChanges, OnDestroy {
  sortables = new Map<string, Sortable>();

  readonly _stateChanges = new Subject<void>();

  @Input()
  active: string;

  @Input()
  start: 'asc' | 'desc' = 'asc';

  @Input()
  get direction(): SortDirection {
    return this._direction;
  }

  set direction(direction: SortDirection) {
    if (
      isDevMode() &&
      direction &&
      direction !== 'asc' &&
      direction !== 'desc'
    ) {
      throw getSortInvalidDirectionError(direction);
    }
    this._direction = direction;
  }

  private _direction: SortDirection = '';

  @Output()
  readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();

  register(sortable: Sortable): void {
    if (!sortable.id) {
      throw getSortHeaderMissingIdError();
    }

    if (this.sortables.has(sortable.id)) {
      throw getSortDuplicateSortableIdError(sortable.id);
    }

    this.sortables.set(sortable.id, sortable);
  }

  deregister(sortable: Sortable): void {
    this.sortables.delete(sortable.id);
  }

  sort(sortable: Sortable): void {
    if (this.active === sortable.id) {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.active = sortable.id;
      this.direction = sortable.start || this.start;
    }

    this.sortChange.emit({
      active: this.active,
      direction: this.direction,
    });
  }

  ngOnChanges() {
    this._stateChanges.next();
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }
}
