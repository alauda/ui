import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TableCellDefDirective } from './table-cell-def.directive';
import { TableCellDirective } from './table-cell.directive';
import { TableColumnDefDirective } from './table-column-def.directive';
import { TableHeaderCellDefDirective } from './table-header-cell-def.directive';
import { TableHeaderCellDirective } from './table-header-cell.directive';
import { TableHeaderRowDefDirective } from './table-header-row-def.directive';
import { TableHeaderRowComponent } from './table-header-row.component';
import { TableRowDefDirective } from './table-row-def.directive';
import { TableRowComponent } from './table-row.component';
import { TableComponent } from './table.component';

@NgModule({
  imports: [CommonModule, CdkTableModule],
  declarations: [
    TableComponent,
    TableRowComponent,
    TableHeaderRowComponent,
    TableCellDirective,
    TableHeaderCellDirective,
    TableRowDefDirective,
    TableHeaderRowDefDirective,
    TableCellDefDirective,
    TableHeaderCellDefDirective,
    TableColumnDefDirective,
  ],
  exports: [
    TableComponent,
    TableRowComponent,
    TableHeaderRowComponent,
    TableCellDirective,
    TableHeaderCellDirective,
    TableRowDefDirective,
    TableHeaderRowDefDirective,
    TableCellDefDirective,
    TableHeaderCellDefDirective,
    TableColumnDefDirective,
  ],
})
export class TableModule {}
