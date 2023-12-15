import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { Directive, ElementRef } from '@angular/core';

import { tableBem } from './table.component';

/** Header cell template container that adds the right classes and role. */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'aui-table-header-cell',
  host: {
    class: 'aui-table__header-cell',
    role: 'columnheader',
  },
  standalone: true,
})
export class TableHeaderCellDirective extends CdkHeaderCell {
  constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(
      tableBem.element(`column-${columnDef.cssClassFriendlyName}`),
    );
  }
}
