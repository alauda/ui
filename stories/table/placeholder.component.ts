import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_SOURCE } from './data';

@Component({
  template: `<aui-table [dataSource]="dataSource">
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
        *auiTableHeaderRowDef="['id', 'name', 'value']"
      ></aui-table-header-row>
      <aui-table-row
        *auiTableRowDef="let row; columns: ['id', 'name', 'value']"
      ></aui-table-row>
      <ng-container *auiTablePlaceholderDef>
        <div class="placeholder">继续加载中...</div>
      </ng-container>
    </aui-table>

    <aui-table [dataSource]="[]">
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
        *auiTableHeaderRowDef="['id', 'name', 'value']"
      ></aui-table-header-row>
      <aui-table-row
        *auiTableRowDef="let row; columns: ['id', 'name', 'value']"
      ></aui-table-row>
      <div
        *auiTablePlaceholderDef
        class="placeholder"
      >
        加载中
      </div>
    </aui-table>

    <aui-table [dataSource]="[]">
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
        *auiTableHeaderRowDef="['id', 'name', 'value']"
      ></aui-table-header-row>
      <aui-table-row
        *auiTableRowDef="let row; columns: ['id', 'name', 'value']"
      ></aui-table-row>
      <div
        *auiTablePlaceholderDef
        class="placeholder"
      >
        无数据
      </div>
    </aui-table> `,
  styleUrls: ['./placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {
  dataSource = DATA_SOURCE.slice(0, 3);
}
