import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_SOURCE } from './data';

@Component({
  template: `
    <div style="height:300px;overflow:auto">
      <h1>Sticky To Parent</h1>
      <aui-table [dataSource]="dataSource">
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
          <aui-table-cell
            *auiTableCellDef="let item"
            direction="column"
          >
            {{ item.name }}
            <div style="font-size: 12px;color: #96989b;line-height: 16px;">
              {{ item.displayName }}
            </div>
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
  standalone: false,
})
export class StickyParentDemoComponent {
  dataSource = [...DATA_SOURCE];
}
