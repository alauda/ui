import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { Directive, ElementRef } from '@angular/core';

import { buildBem } from '../utils';

const bem = buildBem('aui-table');

/** Cell template container that adds the right classes and role. */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'aui-table-cell',
  host: {
    class: 'aui-table__cell',
    role: 'gridcell',
  },
})
export class TableCellDirective extends CdkCell {
  constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(
      bem.element(`column-${columnDef.cssClassFriendlyName}`),
    );
  }
}
