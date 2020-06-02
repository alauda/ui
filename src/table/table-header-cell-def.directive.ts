import { CdkHeaderCellDef } from '@angular/cdk/table';
import { Directive } from '@angular/core';

/**
 * Header cell definition for the aui-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[auiTableHeaderCellDef]',
  providers: [
    {
      provide: CdkHeaderCellDef,
      useExisting: TableHeaderCellDefDirective,
    },
  ],
})
export class TableHeaderCellDefDirective extends CdkHeaderCellDef {}
