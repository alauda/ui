import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { TableCellDefDirective } from './table-cell-def.directive';
import { TableCellComponent } from './table-cell.component';
import { TableCellDirective } from './table-cell.directive';
import { TableColumnDefDirective } from './table-column-def.directive';
import { TableHeaderCellDefDirective } from './table-header-cell-def.directive';
import { TableHeaderCellDirective } from './table-header-cell.directive';
import { TableHeaderRowDefDirective } from './table-header-row-def.directive';
import { TableHeaderRowComponent } from './table-header-row.component';
import { TableRowDefDirective } from './table-row-def.directive';
import { TableRowComponent } from './table-row.component';
import { TableScrollWrapperDirective } from './table-scroll-wrapper.directive';
import { TableComponent } from './table.component';

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule, CdkTableModule],
  declarations: [
    TableComponent,
    TableRowComponent,
    TableHeaderRowComponent,
    TableCellComponent,
    TableCellDirective,
    TableHeaderCellDirective,
    TableRowDefDirective,
    TableHeaderRowDefDirective,
    TableCellDefDirective,
    TableHeaderCellDefDirective,
    TableColumnDefDirective,
    TableScrollWrapperDirective,
  ],
  exports: [
    TableComponent,
    TableRowComponent,
    TableHeaderRowComponent,
    TableCellComponent,
    TableCellDirective,
    TableHeaderCellDirective,
    TableRowDefDirective,
    TableHeaderRowDefDirective,
    TableCellDefDirective,
    TableHeaderCellDefDirective,
    TableColumnDefDirective,
    TableScrollWrapperDirective,
  ],
})
export class TableModule {}
