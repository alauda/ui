import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { Directive, ElementRef } from '@angular/core';

import { buildBem } from '../utils';

const bem = buildBem('aui-table');

/** Header cell template container that adds the right classes and role. */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'aui-table-header-cell',
  host: {
    class: 'aui-table__header-cell',
    role: 'columnheader',
  },
})
export class TableHeaderCellDirective extends CdkHeaderCell {
  constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(
      bem.element(`column-${columnDef.cssClassFriendlyName}`),
    );
  }
}
