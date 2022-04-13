/* eslint-disable jest/no-standalone-expect */
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, map } from 'rxjs';

import { TableModule } from '../table';

import {
  Sort,
  SortDirection,
  SortDirective,
  SortHeaderComponent,
  SortModule,
} from '.';

describe('Sort', () => {
  let fixture: ComponentFixture<SimpleSortAppComponent>;

  let component: SimpleSortAppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SortModule, CdkTableModule, TableModule],
      declarations: [
        SimpleSortAppComponent,
        CdkTableSortAppComponent,
        AuiTableSortAppComponent,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSortAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the sort headers register and deregister themselves', () => {
    const sortables = component.auiSort.sortables;
    expect(sortables.size).toBe(3);
    expect(sortables.get('defaultA')).toBe(component.defaultA);
    expect(sortables.get('defaultB')).toBe(component.defaultB);

    fixture.destroy();
    expect(sortables.size).toBe(0);
  });

  it('should use the column definition if used within a cdk table', () => {
    const cdkTableAuiSortAppFixture = TestBed.createComponent(
      CdkTableSortAppComponent,
    );
    const cdkTableAuiSortAppComponent =
      cdkTableAuiSortAppFixture.componentInstance;

    cdkTableAuiSortAppFixture.detectChanges();
    cdkTableAuiSortAppFixture.detectChanges();

    const sortables = cdkTableAuiSortAppComponent.auiSort.sortables;
    expect(sortables.size).toBe(3);
    expect(sortables.has('column_a')).toBe(true);
    expect(sortables.has('column_b')).toBe(true);
    expect(sortables.has('column_c')).toBe(true);
  });

  it('should use the column definition if used within an aui table', () => {
    const auiTableSortAppFixture = TestBed.createComponent(
      AuiTableSortAppComponent,
    );
    const auiTableSortAppComponent = auiTableSortAppFixture.componentInstance;

    auiTableSortAppFixture.detectChanges();
    auiTableSortAppFixture.detectChanges();

    const sortables = auiTableSortAppComponent.auiSort.sortables;
    expect(sortables.size).toBe(3);
    expect(sortables.has('column_a')).toBe(true);
    expect(sortables.has('column_b')).toBe(true);
    expect(sortables.has('column_c')).toBe(true);
  });

  describe('checking correct arrow direction and view state for its various states', () => {
    let expectedStates: Map<
      string,
      { viewState: string; arrowDirection: string }
    >;

    beforeEach(() => {
      // Starting state for the view and directions - note that overrideStart is reversed to be desc
      expectedStates = new Map<
        string,
        { viewState: string; arrowDirection: string }
      >([
        ['defaultA', { viewState: '', arrowDirection: 'asc' }],
        ['defaultB', { viewState: '', arrowDirection: 'asc' }],
        ['overrideStart', { viewState: '', arrowDirection: 'desc' }],
      ]);
      component.expectViewAndDirectionStates(expectedStates);
    });

    it('should be correct when sort has changed while a header is active', () => {
      // Sort the first header to set up
      component.sort('defaultA');
      expectedStates.set('defaultA', {
        viewState: 'active',
        arrowDirection: 'asc',
      });
      component.expectViewAndDirectionStates(expectedStates);

      // Sort the second header and verify that the first header inactive
      component.dispatchMouseEvent('defaultB', 'click');
      expectedStates.set('defaultA', { viewState: '', arrowDirection: 'asc' });
      expectedStates.set('defaultB', {
        viewState: 'active',
        arrowDirection: 'asc',
      });
    });

    it('should be correct when sort a actived header again', () => {
      // Sort the second header again and verify that the second header arrow direction change.
      component.dispatchMouseEvent('defaultB', 'click');
      expectedStates.set('defaultB', {
        viewState: 'active',
        arrowDirection: 'asc',
      });
      component.dispatchMouseEvent('defaultB', 'click');
      expectedStates.set('defaultB', {
        viewState: 'active',
        arrowDirection: 'desc',
      });
      component.dispatchMouseEvent('defaultB', 'click');
      expectedStates.set('defaultB', {
        viewState: 'active',
        arrowDirection: 'asc',
      });
    });

    it('should be correct when sort a overridden header first time', () => {
      // Sort the override header and verify that the states is correct.
      component.dispatchMouseEvent('overrideStart', 'click');
      expectedStates.set('overrideStart', {
        viewState: 'active',
        arrowDirection: 'desc',
      });
      component.expectViewAndDirectionStates(expectedStates);
    });
  });
});

/** Column IDs of the SimpleMatSortApp for typing of function params in the component (e.g. sort) */
type SimpleAuiSortAppColumnIds = 'defaultA' | 'defaultB' | 'overrideStart';

@Component({
  template: `
    <div
      auiSort
      [active]="active"
      [start]="start"
      [direction]="direction"
      (sortChange)="latestSortEvent = $event"
    >
      <div
        id="defaultA"
        #defaultA
        aui-sort-header="defaultA"
      >
        A
      </div>
      <div
        id="defaultB"
        #defaultB
        aui-sort-header="defaultB"
      >
        B
      </div>
      <div
        id="overrideStart"
        #overrideStart
        aui-sort-header="overrideStart"
        start="desc"
      >
        D
      </div>
    </div>
  `,
})
class SimpleSortAppComponent {
  latestSortEvent: Sort;

  active: string;
  start: SortDirection = 'asc';
  direction: SortDirection = '';
  disableClear: boolean;
  disabledColumnSort = false;
  disableAllSort = false;

  @ViewChild(SortDirective, { static: true })
  auiSort: SortDirective;

  @ViewChild('defaultA', { static: true })
  defaultA: SortHeaderComponent;

  @ViewChild('defaultB', { static: true })
  defaultB: SortHeaderComponent;

  @ViewChild('overrideStart', { static: true })
  overrideStart: SortHeaderComponent;

  constructor(public elementRef: ElementRef<HTMLElement>) {}

  sort(id: SimpleAuiSortAppColumnIds) {
    this.dispatchMouseEvent(id, 'click');
  }

  dispatchMouseEvent(id: SimpleAuiSortAppColumnIds, event: string) {
    const sortElement = this.elementRef.nativeElement.querySelector(
      `#${id}>div`,
    );
    dispatchMouseEvent(sortElement, event);
  }

  /**
   * Checks expectations for each sort header's view state and arrow direction states. Receives a
   * map that is keyed by each sort header's ID and contains the expectation for that header's
   * states.
   */
  expectViewAndDirectionStates(
    viewStates: Map<string, { viewState: string; arrowDirection: string }>,
  ) {
    const sortHeaders = new Map([
      ['defaultA', this.defaultA],
      ['defaultB', this.defaultB],
      ['overrideStart', this.overrideStart],
    ]);

    viewStates.forEach((viewState, id) => {
      expect(sortHeaders.get(id)._viewState).toEqual(viewState.viewState);
      expect(sortHeaders.get(id).arrowDirection).toEqual(
        viewState.arrowDirection,
      );
    });
  }
}

class FakeDataSource extends DataSource<any> {
  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return collectionViewer.viewChange.pipe(map(() => []));
  }

  disconnect() {
    //
  }
}

@Component({
  template: `
    <cdk-table
      [dataSource]="dataSource"
      auiSort
    >
      <ng-container cdkColumnDef="column_a">
        <cdk-header-cell
          *cdkHeaderCellDef
          #sortHeaderA
          aui-sort-header
        >
          Column A
        </cdk-header-cell>
        <cdk-cell *cdkCellDef="let row">{{ row.a }}</cdk-cell>
      </ng-container>
      <ng-container cdkColumnDef="column_b">
        <cdk-header-cell
          *cdkHeaderCellDef
          #sortHeaderB
          aui-sort-header
        >
          Column B
        </cdk-header-cell>
        <cdk-cell *cdkCellDef="let row">{{ row.b }}</cdk-cell>
      </ng-container>
      <ng-container cdkColumnDef="column_c">
        <cdk-header-cell
          *cdkHeaderCellDef
          #sortHeaderC
          aui-sort-header
        >
          Column C
        </cdk-header-cell>
        <cdk-cell *cdkCellDef="let row">{{ row.c }}</cdk-cell>
      </ng-container>
      <cdk-header-row *cdkHeaderRowDef="columnsToRender"></cdk-header-row>
      <cdk-row *cdkRowDef="let row; columns: columnsToRender"></cdk-row>
    </cdk-table>
  `,
})
class CdkTableSortAppComponent {
  @ViewChild(SortDirective, { static: true })
  auiSort: SortDirective;

  dataSource = new FakeDataSource();
  columnsToRender = ['column_a', 'column_b', 'column_c'];
}

@Component({
  template: `
    <aui-table
      [dataSource]="dataSource"
      auiSort
    >
      <ng-container auiTableColumnDef="column_a">
        <aui-table-header-cell
          *auiTableHeaderCellDef
          #sortHeaderA
          aui-sort-header
        >
          Column A
        </aui-table-header-cell>
        <aui-table-cell *auiTableCellDef="let row">{{ row.a }}</aui-table-cell>
      </ng-container>
      <ng-container auiTableColumnDef="column_b">
        <aui-table-header-cell
          *auiTableHeaderCellDef
          #sortHeaderB
          aui-sort-header
        >
          Column B
        </aui-table-header-cell>
        <aui-table-cell *auiTableCellDef="let row">{{ row.b }}</aui-table-cell>
      </ng-container>
      <ng-container auiTableColumnDef="column_c">
        <aui-table-header-cell
          *auiTableHeaderCellDef
          #sortHeaderC
          aui-sort-header
        >
          Column C
        </aui-table-header-cell>
        <aui-table-cell *matCellDef="let row">{{ row.c }}</aui-table-cell>
      </ng-container>
      <aui-table-header-row
        *auiTableHeaderRowDef="columnsToRender"
      ></aui-table-header-row>
      <aui-table-row
        *auiTableRowDef="let row; columns: columnsToRender"
      ></aui-table-row>
    </aui-table>
  `,
})
class AuiTableSortAppComponent {
  @ViewChild(SortDirective, { static: true })
  auiSort: SortDirective;

  dataSource = new FakeDataSource();
  columnsToRender = ['column_a', 'column_b', 'column_c'];
}

// TODO: not sure the cdk testing utils is really needed. copied inline for now.

function dispatchMouseEvent(
  node: Node,
  type: string,
  x = 0,
  y = 0,
  event = createMouseEvent(type, x, y),
): MouseEvent {
  return dispatchEvent(node, event) as MouseEvent;
}

function dispatchEvent(node: Node | Window, event: Event): Event {
  node.dispatchEvent(event);
  return event;
}

/** Creates a browser MouseEvent with the specified options. */
export function createMouseEvent(type: string, x = 0, y = 0) {
  return new MouseEvent(type, {
    screenX: x,
    screenY: y,
    clientX: x,
    clientY: y,
  });
}
