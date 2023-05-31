import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_SOURCE } from './data';

@Component({
  selector: 'sticky-headers-table-demo',
  template: `
    <div auiTableScrollWrapper="300px">
      <aui-table
        auiTableScrollable
        [dataSource]="dataSource"
      >
        <ng-container auiTableColumnDef="id">
          <aui-table-header-cell *auiTableHeaderCellDef>
            No.
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            <div>{{ item.id }}</div>
          </aui-table-cell>
        </ng-container>
        <ng-container auiTableColumnDef="name">
          <aui-table-header-cell *auiTableHeaderCellDef>
            Name
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            <div>{{ item.name }}</div>
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
        <aui-table-header-row
          *auiTableHeaderRowDef="['id', 'name', 'value']; sticky: true"
        ></aui-table-header-row>
        <aui-table-row
          *auiTableRowDef="let row; columns: ['id', 'name', 'value']"
        ></aui-table-row>
      </aui-table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyHeadersDemoComponent {
  dataSource = [...DATA_SOURCE];
}
