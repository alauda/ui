import { DataSource } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';

import { TableComponent, tableBem } from './table.component';
import { TableModule } from './table.module';

describe('Table', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableModule, SimpleTableAppComponent],
    });
  });

  describe('with basic data source', () => {
    it('should be able to create a table with the right content and without when row', () => {
      const fixture = TestBed.createComponent(SimpleTableAppComponent);
      fixture.detectChanges();

      const tableElement = (fixture.nativeElement as HTMLElement).querySelector(
        '.aui-table',
      );
      const data = fixture.componentInstance.dataSource.data;
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        [data[0].a, data[0].b, data[0].c],
        [data[1].a, data[1].b, data[1].c],
        [data[2].a, data[2].b, data[2].c],
        ['fourth_row'],
      ]);
    });
  });
});

interface TestData {
  a?: string;
  b?: string;
  c?: string;
}

class FakeDataSource extends DataSource<TestData> {
  _dataChange = new BehaviorSubject<TestData[]>([]);
  set data(data: TestData[]) {
    this._dataChange.next(data);
  }

  get data() {
    return this._dataChange.getValue();
  }

  constructor() {
    super();
    for (let i = 0; i < 4; i++) {
      this.addData();
    }
  }

  connect(): Observable<TestData[]> {
    return this._dataChange;
  }

  disconnect() {
    //
  }

  addData() {
    const nextIndex = this.data.length + 1;

    const copiedData = this.data.slice();
    copiedData.push({
      a: `a_${nextIndex}`,
      b: `b_${nextIndex}`,
      c: `c_${nextIndex}`,
    });

    this.data = copiedData;
  }
}

@Component({
  template: `
    <aui-table [dataSource]="dataSource">
      <ng-container auiTableColumnDef="column_a">
        <aui-table-header-cell *auiTableHeaderCellDef>
          Column A
        </aui-table-header-cell>
        <aui-table-cell *auiTableCellDef="let row">{{ row.a }}</aui-table-cell>
      </ng-container>
      <ng-container auiTableColumnDef="column_b">
        <aui-table-header-cell *auiTableHeaderCellDef>
          Column B
        </aui-table-header-cell>
        <aui-table-cell *auiTableCellDef="let row">{{ row.b }}</aui-table-cell>
      </ng-container>
      <ng-container auiTableColumnDef="column_c">
        <aui-table-header-cell *auiTableHeaderCellDef>
          Column C
        </aui-table-header-cell>
        <aui-table-cell *auiTableCellDef="let row">{{ row.c }}</aui-table-cell>
      </ng-container>
      <ng-container auiTableColumnDef="special_column">
        <aui-table-cell *auiTableCellDef="let row">fourth_row</aui-table-cell>
      </ng-container>
      <aui-table-header-row
        *auiTableHeaderRowDef="columnsToRender"
      ></aui-table-header-row>
      <aui-table-row
        *auiTableRowDef="let row; columns: columnsToRender"
      ></aui-table-row>
      <aui-table-row
        *auiTableRowDef="
          let row;
          columns: ['special_column'];
          when: isFourthRow
        "
      ></aui-table-row>
    </aui-table>
  `,
  standalone: true,
  imports: [TableModule],
})
class SimpleTableAppComponent {
  dataSource: FakeDataSource | null = new FakeDataSource();
  columnsToRender = ['column_a', 'column_b', 'column_c'];
  @ViewChild(TableComponent, { static: true })
  table: TableComponent<TestData>;

  isFourthRow = (i: number, _rowData: TestData) => i === 3;
}

// Utilities copied from CDKTable's spec
function getElements(element: Element, query: string) {
  return ([] as Element[]).slice.call(element.querySelectorAll(query));
}

function getHeaderRow(tableElement: Element): Element {
  return tableElement.querySelector(`.${tableBem.element('header-row')}`);
}

function getRows(tableElement: Element): Element[] {
  return getElements(tableElement, `.${tableBem.element('row')}`);
}
function getCells(row: Element): Element[] {
  return row ? getElements(row, `.${tableBem.element('cell')}`) : [];
}

function getHeaderCells(tableElement: Element): Element[] {
  return getElements(
    getHeaderRow(tableElement),
    `.${tableBem.element('header-cell')}`,
  );
}

function expectTableToMatchContent(
  tableElement: Element,
  expectedTableContent: string[][],
) {
  const missedExpectations: string[] = [];
  function checkCellContent(cell: Element, expectedTextContent: string) {
    const actualTextContent = cell.textContent.trim();
    if (actualTextContent !== expectedTextContent) {
      missedExpectations.push(
        `Expected cell contents to be ${expectedTextContent} but was ${actualTextContent}`,
      );
    }
  }

  // Check header cells
  const expectedHeaderContent = expectedTableContent.shift();
  getHeaderCells(tableElement).forEach((cell, index) => {
    const expected = expectedHeaderContent
      ? expectedHeaderContent[index]
      : null;
    checkCellContent(cell, expected);
  });

  // Check data row cells
  const rows = getRows(tableElement);
  expect(rows.length).toBe(expectedTableContent.length);
  rows.forEach((row, rowIndex) => {
    getCells(row).forEach((cell, cellIndex) => {
      const expected =
        expectedTableContent.length > 0
          ? expectedTableContent[rowIndex][cellIndex]
          : null;
      checkCellContent(cell, expected);
    });
  });

  if (missedExpectations.length > 0) {
    // eslint-disable-next-line jest/no-jasmine-globals
    fail(missedExpectations.join('\n'));
  }
}
