import { NgModule } from '@angular/core';

import { TableCellDefDirective } from './table-cell-def.directive';
import {
  TableExpandButtonCellComponent,
  TableExpandPanelCellComponent,
} from './table-cell.component';
import { TableCellDirective } from './table-cell.directive';
import { TableColumnDefDirective } from './table-column-def.directive';
import { TableColumnResizableDirective } from './table-column-resizable.directive';
import { TableHeaderCellDefDirective } from './table-header-cell-def.directive';
import { TableHeaderCellDirective } from './table-header-cell.directive';
import { TableHeaderRowDefDirective } from './table-header-row-def.directive';
import { TableHeaderRowComponent } from './table-header-row.component';
import {
  TablePlaceholderDefDirective,
  TablePlaceholderOutletDirective,
} from './table-placeholder.directive';
import { TableRowDefDirective } from './table-row-def.directive';
import { TableRowComponent } from './table-row.component';
import {
  TableScrollableDirective,
  TableScrollWrapperDirective,
} from './table-scroll.directive';
import { TableComponent } from './table.component';

export const TABLE_MODULE = [
  TableComponent,
  TableRowComponent,
  TableHeaderRowComponent,
  TableExpandButtonCellComponent,
  TableExpandPanelCellComponent,
  TableCellDirective,
  TableCellDefDirective,
  TableHeaderCellDirective,
  TableRowDefDirective,
  TableHeaderRowDefDirective,
  TableHeaderCellDefDirective,
  TableColumnDefDirective,
  TableColumnResizableDirective,
  TablePlaceholderOutletDirective,
  TablePlaceholderDefDirective,
  TableScrollWrapperDirective,
  TableScrollableDirective,
] as const;

@NgModule({
  imports: [...TABLE_MODULE],
  exports: [...TABLE_MODULE],
})
export class TableModule {}
