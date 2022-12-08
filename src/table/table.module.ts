import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/icon.module';

import { NewTableCellDirective } from './new/table-cell.directive';
import { NewTableHeaderCellDirective } from './new/table-header-cell.directive';
import { NewTableHeaderRowComponent } from './new/table-header-row.component';
import { NewTableRowComponent } from './new/table-row.component';
import { NewTableComponent } from './new/table.component';
import { TableCellDefDirective } from './table-cell-def.directive';
import {
  TableExpandButtonCellComponent,
  TableExpandPanelCellComponent,
} from './table-cell.component';
import { TableCellDirective } from './table-cell.directive';
import { TableColumnDefDirective } from './table-column-def.directive';
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

@NgModule({
  imports: [CommonModule, IconModule, CdkTableModule],
  declarations: [
    TableComponent,
    TableRowComponent,
    TableHeaderRowComponent,
    TableExpandButtonCellComponent,
    TableExpandPanelCellComponent,
    NewTableComponent,
    NewTableHeaderRowComponent,
    NewTableRowComponent,
    TableCellDirective,
    TableCellDefDirective,
    TableHeaderCellDirective,
    TableRowDefDirective,
    TableHeaderRowDefDirective,
    TableHeaderCellDefDirective,
    TableColumnDefDirective,
    TableScrollableDirective,
    TablePlaceholderOutletDirective,
    TablePlaceholderDefDirective,
    TableScrollWrapperDirective,
    NewTableCellDirective,
    NewTableHeaderCellDirective,
  ],
  exports: [
    TableComponent,
    TableRowComponent,
    TableHeaderRowComponent,
    TableExpandButtonCellComponent,
    TableExpandPanelCellComponent,
    NewTableComponent,
    NewTableHeaderRowComponent,
    NewTableRowComponent,
    TableCellDirective,
    TableCellDefDirective,
    TableHeaderCellDirective,
    TableRowDefDirective,
    TableHeaderRowDefDirective,
    TableHeaderCellDefDirective,
    TableColumnDefDirective,
    TableScrollableDirective,
    TablePlaceholderOutletDirective,
    TablePlaceholderDefDirective,
    TableScrollWrapperDirective,
    NewTableCellDirective,
    NewTableHeaderCellDirective,
  ],
})
export class TableModule {}
