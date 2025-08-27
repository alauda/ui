import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `<h1>固定header & 列</h1>
    <p>
      <button
        aui-button
        (click)="clear()"
      >
        清空
      </button>
      <button
        aui-button
        (click)="reset()"
      >
        重置
      </button>
    </p>
    <div auiTableScrollWrapper="280px">
      <aui-table
        [dataSource]="dataSource"
        auiTableScrollable
      >
        <ng-container
          auiTableColumnDef="no"
          [sticky]="true"
        >
          <aui-table-header-cell
            *auiTableHeaderCellDef
            auiTableColumnResizable
          >
            No.
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">{{
            item[0]
          }}</aui-table-cell>
        </ng-container>
        <ng-container
          auiTableColumnDef="cell1"
          [sticky]="true"
        >
          <aui-table-header-cell
            *auiTableHeaderCellDef
            auiTableColumnResizable
          >
            header cell
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[1] }}
          </aui-table-cell>
        </ng-container>
        <ng-container auiTableColumnDef="cell2">
          <aui-table-header-cell *auiTableHeaderCellDef>
            header cell
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[2] }}
          </aui-table-cell>
        </ng-container>
        <ng-container auiTableColumnDef="cell3">
          <aui-table-header-cell *auiTableHeaderCellDef>
            header cell
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[3] }}
          </aui-table-cell>
        </ng-container>
        <ng-container auiTableColumnDef="cell4">
          <aui-table-header-cell *auiTableHeaderCellDef>
            header cell
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[4] }}
          </aui-table-cell>
        </ng-container>
        <ng-container auiTableColumnDef="cell5">
          <aui-table-header-cell
            *auiTableHeaderCellDef
            auiTableColumnResizable
          >
            header cell
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[5] }}
          </aui-table-cell>
        </ng-container>
        <ng-container auiTableColumnDef="cell6">
          <aui-table-header-cell *auiTableHeaderCellDef>
            header cell
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[6] }}
          </aui-table-cell>
        </ng-container>
        <ng-container auiTableColumnDef="cell7">
          <aui-table-header-cell *auiTableHeaderCellDef>
            header cell
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[7] }}
          </aui-table-cell>
        </ng-container>
        <ng-container auiTableColumnDef="cell8">
          <aui-table-header-cell *auiTableHeaderCellDef>
            header cell
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[8] }}
          </aui-table-cell>
        </ng-container>
        <ng-container auiTableColumnDef="cell9">
          <aui-table-header-cell
            *auiTableHeaderCellDef
            auiTableColumnResizable
          >
            header cell
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[9] }}
          </aui-table-cell>
        </ng-container>
        <ng-container
          auiTableColumnDef="cell10"
          stickyEnd
        >
          <aui-table-header-cell
            *auiTableHeaderCellDef
            auiTableColumnResizable
          >
            header cell
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[10] }}
          </aui-table-cell>
        </ng-container>
        <ng-container auiTableColumnDef="cell11">
          <aui-table-header-cell *auiTableHeaderCellDef>
            header cell11
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[11] }}
          </aui-table-cell> </ng-container
        ><ng-container auiTableColumnDef="cell12">
          <aui-table-header-cell
            *auiTableHeaderCellDef
            auiTableColumnResizable
          >
            header cell12
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[12] }}
          </aui-table-cell> </ng-container
        ><ng-container auiTableColumnDef="cell13">
          <aui-table-header-cell *auiTableHeaderCellDef>
            header cell13
          </aui-table-header-cell>
          <aui-table-cell *auiTableCellDef="let item">
            {{ item[13] }}
          </aui-table-cell>
        </ng-container>
        <aui-table-header-row
          *auiTableHeaderRowDef="columns; sticky: true"
        ></aui-table-header-row>
        <aui-table-row
          *auiTableRowDef="let row; columns: columns"
        ></aui-table-row>
        <ng-container *auiTablePlaceholderDef>
          <div
            class="empty"
            *ngIf="!dataSource.length"
          >
            No Data
          </div>
        </ng-container>
      </aui-table>
    </div> `,
  styleUrls: ['sticky-columns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class StickyColumnsDemoComponent {
  columns = ['no'].concat(
    Array.from({ length: 13 }).map((_, index) => `cell${index + 1}`),
  );

  dataSource: string[][] = this._mockData();

  private _mockData() {
    return Array.from({ length: 6 }).map((_, i) =>
      ['1'].concat(Array.from({ length: 13 }).map((_, j) => `cell${i}${j}`)),
    );
  }

  clear() {
    this.dataSource = [];
  }

  reset() {
    if (!this.dataSource.length) {
      this.dataSource = this._mockData();
    }
  }
}
