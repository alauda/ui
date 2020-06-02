import { CdkRowDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';

/**
 * Data row definition for the aui-table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
@Directive({
  selector: '[auiTableRowDef]',
  providers: [
    {
      provide: CdkRowDef,
      useExisting: TableRowDefDirective,
    },
  ],
})
export class TableRowDefDirective<T> extends CdkRowDef<T> {
  @Input('auiTableRowDefColumns')
  columns: string[];

  @Input('auiTableRowDefWhen')
  when: (index: number, rowData: T) => boolean;
}
