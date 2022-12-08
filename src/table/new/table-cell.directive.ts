import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { Directive, ElementRef, Input } from '@angular/core';

import { buildBem } from '../../utils';

const bem = buildBem('aui-table');

/** Cell template container that adds the right classes and role. */
@Directive({
  selector: '[auiTableCell]',
  host: {
    class: 'aui-table__cell',
    role: 'gridcell',
    '[class.aui-table__cell--column]': 'direction === "column"',
  },
})
export class NewTableCellDirective extends CdkCell {
  @Input()
  direction: 'row' | 'column' = 'row';

  constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(
      bem.element(`column-${columnDef.cssClassFriendlyName}`),
    );
  }
}
