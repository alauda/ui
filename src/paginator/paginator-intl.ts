import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * To modify the labels and text displayed, create a new instance of MatPaginatorIntl and
 * include it in a custom provider
 */
@Injectable({
  providedIn: 'root',
})
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

  getTotalLabel = (length: number) => `Total ${length}`;
}
