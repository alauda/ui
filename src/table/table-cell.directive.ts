import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { Directive, ElementRef, Input } from '@angular/core';

import { tableBem } from './table.component';

/** Cell template container that adds the right classes and role. */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'aui-table-cell',
  host: {
    class: 'aui-table__cell',
    role: 'gridcell',
    '[class.aui-table__cell--column]': 'direction === "column"',
  },
  standalone: true,
})
export class TableCellDirective extends CdkCell {
  @Input()
  direction: 'column' | 'row' = 'row';

  constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(
      tableBem.element(`column-${columnDef.cssClassFriendlyName}`),
    );
  }
}
