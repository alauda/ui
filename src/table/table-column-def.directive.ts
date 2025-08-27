import { CdkColumnDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';

/**
 * Column definition for the aui-table.
 * Defines a set of cells available for a table column.
 */
@Directive({
  selector: '[auiTableColumnDef]',
  providers: [
    {
      provide: CdkColumnDef,
      useExisting: TableColumnDefDirective,
    },
  ],
  inputs: ['sticky'],
  standalone: true,
})
export class TableColumnDefDirective extends CdkColumnDef {
  // Unique name for this column
  // Why it does not work in `inputs` property?
  @Input()
  set auiTableColumnDef(value: string) {
    this.name = value;
  }
}
