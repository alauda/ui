import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_SOURCE } from './data';

@Component({
  template: `<aui-table [dataSource]="dataSource">
    <ng-container auiTableColumnDef="expand-button">
      <aui-table-header-cell *auiTableHeaderCellDef></aui-table-header-cell>
      <aui-table-cell
        *auiTableCellDef="let item; let i = index"
        auiExpandButton
        [disabled]="i === 0"
        [expand]="rowExpanded.has(item.id)"
        (expandChange)="toggleRow(item.id)"
      >
      </aui-table-cell>
    </ng-container>
    <ng-container auiTableColumnDef="id">
      <aui-table-header-cell *auiTableHeaderCellDef>No.</aui-table-header-cell>
      <aui-table-cell *auiTableCellDef="let item">
        {{ item.id }}
      </aui-table-cell>
    </ng-container>
    <ng-container auiTableColumnDef="name">
      <aui-table-header-cell *auiTableHeaderCellDef>Name</aui-table-header-cell>
      <aui-table-cell *auiTableCellDef="let item">
        {{ item.name }}
        ({{ item.displayName }})
      </aui-table-cell>
    </ng-container>
    <ng-container auiTableColumnDef="value">
      <aui-table-header-cell *auiTableHeaderCellDef>
        Value
      </aui-table-header-cell>
      <aui-table-cell *auiTableCellDef="let item">
        {{ item.value }}
      </aui-table-cell>
    </ng-container>
    <ng-container auiTableColumnDef="expand-panel">
      <aui-table-header-cell *auiTableHeaderCellDef></aui-table-header-cell>
      <aui-table-cell
        *auiTableCellDef="let item"
        auiExpandPanel
        [expand]="rowExpanded.has(item.id)"
      >
        <span>展开的内容</span>
      </aui-table-cell>
    </ng-container>

    <aui-table-header-row
      *auiTableHeaderRowDef="[
        'expand-button',
        'id',
        'name',
        'value',
        'expand-panel',
      ]"
    ></aui-table-header-row>
    <aui-table-row
      *auiTableRowDef="
        let row;
        columns: ['expand-button', 'id', 'name', 'value', 'expand-panel']
      "
    ></aui-table-row>
  </aui-table> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandDemoComponent {
  dataSource = DATA_SOURCE.slice();

  rowExpanded = new Set<number>();

  toggleRow(id: number) {
    if (this.rowExpanded.has(id)) {
      this.rowExpanded.delete(id);
    } else {
      this.rowExpanded.add(id);
    }
  }
}
