/* eslint-disable jest/no-standalone-expect */
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TableModule } from '../table/public-api';

import {
  Sort,
  SortDirection,
  SortDirective,
  SortHeaderComponent,
  SortModule,
} from './public-api';

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
      <div id="defaultA" #defaultA aui-sort-header="defaultA">
        A
      </div>
      <div id="defaultB" #defaultB aui-sort-header="defaultB">
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

  constructor(public elementRef: ElementRef) {}

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

@Component({
  template: `
    <cdk-table [dataSource]="dataSource" auiSort>
      <ng-container cdkColumnDef="column_a">
        <cdk-header-cell *cdkHeaderCellDef #sortHeaderA aui-sort-header>
          Column A
        </cdk-header-cell>
        <cdk-cell *cdkCellDef="let row">{{ row.a }}</cdk-cell>
      </ng-container>
      <ng-container cdkColumnDef="column_b">
        <cdk-header-cell *cdkHeaderCellDef #sortHeaderB aui-sort-header>
          Column B
        </cdk-header-cell>
        <cdk-cell *cdkCellDef="let row">{{ row.b }}</cdk-cell>
      </ng-container>
      <ng-container cdkColumnDef="column_c">
        <cdk-header-cell *cdkHeaderCellDef #sortHeaderC aui-sort-header>
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
    <aui-table [dataSource]="dataSource" auiSort>
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

class FakeDataSource extends DataSource<any> {
  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return collectionViewer.viewChange.pipe(map(() => []));
  }

  disconnect() {
    //
  }
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
  const event = document.createEvent('MouseEvent');

  event.initMouseEvent(
    type,
    false /* canBubble */,
    false /* cancelable */,
    window /* view */,
    0 /* detail */,
    x /* screenX */,
    y /* screenY */,
    x /* clientX */,
    y /* clientY */,
    false /* ctrlKey */,
    false /* altKey */,
    false /* shiftKey */,
    false /* metaKey */,
    0 /* button */,
    null /* relatedTarget */,
  );

  return event;
}

/** Creates a browser TouchEvent with the specified pointer coordinates. */
export function createTouchEvent(type: string, pageX = 0, pageY = 0) {
  // In favor of creating events that work for most of the browsers, the event is created
  // as a basic UI Event. The necessary details for the event will be set manually.
  const event = document.createEvent('UIEvent');
  const touchDetails = { pageX, pageY };

  // @ts-ignore
  event.initUIEvent(type, true, true, window, 0);

  // Most of the browsers don't have a "initTouchEvent" method that can be used to define
  // the touch details.
  Object.defineProperties(event, {
    touches: { value: [touchDetails] },
  });

  return event;
}

/** Dispatches a keydown event from an element. */
export function createKeyboardEvent(
  type: string,
  keyCode: number,
  target?: Element,
  key?: string,
) {
  const event = document.createEvent('KeyboardEvent') as any;
  // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
  const initEventFn = (event.initKeyEvent || event.initKeyboardEvent).bind(
    event,
  );
  const originalPreventDefault = event.preventDefault;

  initEventFn(type, true, true, window, 0, 0, 0, 0, 0, keyCode);

  // Webkit Browsers don't set the keyCode when calling the init function.
  // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
  Object.defineProperties(event, {
    keyCode: { get: () => keyCode },
    key: { get: () => key },
    target: { get: () => target },
  });

  // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
  event.preventDefault = function () {
    Object.defineProperty(event, 'defaultPrevented', { get: () => true });
    // eslint-disable-next-line prefer-rest-params
    return Reflect.apply(originalPreventDefault, this, arguments);
  };

  return event;
}

/** Creates a fake event object with any desired event type. */
export function createFakeEvent(
  type: string,
  canBubble = true,
  cancelable = true,
) {
  const event = document.createEvent('Event');
  event.initEvent(type, canBubble, cancelable);
  return event;
}
