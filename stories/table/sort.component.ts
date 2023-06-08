import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_SOURCE, Element } from './data';

import { Sort } from '@alauda/ui';

@Component({
  template: `<aui-table
    auiSort
    [dataSource]="dataSource"
    (sortChange)="sortData($event)"
  >
    <ng-container auiTableColumnDef="id">
      <aui-table-header-cell
        *auiTableHeaderCellDef
        aui-sort-header
      >
        No.
      </aui-table-header-cell>
      <aui-table-cell *auiTableCellDef="let item">{{ item.id }}</aui-table-cell>
    </ng-container>
    <ng-container auiTableColumnDef="name">
      <aui-table-header-cell
        *auiTableHeaderCellDef
        aui-sort-header
      >
        Name
      </aui-table-header-cell>
      <aui-table-cell *auiTableCellDef="let item">
        {{ item.name }}
        ({{ item.displayName }})
      </aui-table-cell>
    </ng-container>
    <ng-container auiTableColumnDef="value">
      <aui-table-header-cell
        *auiTableHeaderCellDef
        aui-sort-header
        start="desc"
      >
        Value
      </aui-table-header-cell>
      <aui-table-cell *auiTableCellDef="let item">
        {{ item.value }}
      </aui-table-cell>
    </ng-container>
    <aui-table-header-row
      *auiTableHeaderRowDef="['id', 'name', 'value']"
    ></aui-table-header-row>
    <aui-table-row
      *auiTableRowDef="let row; columns: ['id', 'name', 'value']"
    ></aui-table-row>
  </aui-table> `,
  styleUrls: ['sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortDemoComponent {
  dataSource = DATA_SOURCE.slice();

  sortData(sort: Sort) {
    const activeKey = sort.active as keyof Element;
    this.dataSource = DATA_SOURCE.slice().sort((a, b) =>
      a[activeKey] === b[activeKey]
        ? 0
        : a[activeKey] > b[activeKey]
        ? sort.direction === 'asc'
          ? 1
          : -1
        : sort.direction === 'asc'
        ? -1
        : 1,
    );
  }
}
