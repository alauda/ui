import { CdkCellDef } from '@angular/cdk/table';
import { Directive } from '@angular/core';

/**
 * Cell definition for the aui-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
  selector: '[auiTableCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: TableCellDefDirective }],
})
export class TableCellDefDirective extends CdkCellDef {}
