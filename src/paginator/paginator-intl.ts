import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * To modify the labels and text displayed, create a new instance of MatPaginatorIntl and
 * include it in a custom provider
 */
@Injectable()
export class PaginatorIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** A label for the page size selector. */
  itemsPerPageLabel = 'perPage';

  jumperLabelPrefix = 'Goto';
  jumperLabelSuffix = '';

  getTotalLabel = (length: number) => {
    return `Total ${length}`;
  };
}

export function PAGINATOR_INTL_PROVIDER_FACTORY(parentIntl: PaginatorIntl) {
  return parentIntl || new PaginatorIntl();
}

export const PAGINATOR_INTL_PROVIDER = {
  // If there is already an PaginatorIntl available, use that. Otherwise, provide a new one.
  provide: PaginatorIntl,
  deps: [[new Optional(), new SkipSelf(), PaginatorIntl]],
  useFactory: PAGINATOR_INTL_PROVIDER_FACTORY,
};
