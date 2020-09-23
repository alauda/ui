import { CdkHeaderRowDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';

/**
 * Header row definition for the aui-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
  selector: '[auiTableHeaderRowDef]',
  providers: [
    {
      provide: CdkHeaderRowDef,
      useExisting: TableHeaderRowDefDirective,
    },
  ],
})
export class TableHeaderRowDefDirective extends CdkHeaderRowDef {
  @Input('auiTableHeaderRowDef')
  columns: string[];

  @Input('auiTableHeaderRowDefSticky')
  sticky: boolean;
}
