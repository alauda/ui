import {
  IconModule,
  ScrollingModule,
  SortModule,
  TableModule,
} from '@alauda/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { boolean, object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { ExpandDemoComponent } from './expand-demo/expand-demo.component';
import { FixedSizeVirtualScrollDemoComponent } from './fixed-size-virtual-scroll-demo/fixed-size-virtual-scroll-demo.component';
import { SortDemoComponent } from './sort-demo/sort-demo.component';
import { StickyColumnsDemoComponent } from './sticky-columns/sticky-columns-demo.component';

export const DATA_SOURCE: Element[] = [
  { id: 1, name: 'element1', displayName: 'Element One', value: 5 },
  { id: 2, name: 'element1', displayName: 'Element Two', value: 8 },
  { id: 3, name: 'element1', displayName: 'Element Three', value: 2 },
  { id: 4, name: 'element1', displayName: 'Element Four', value: 9 },
  { id: 5, name: 'element1', displayName: 'Element Five', value: 3 },
  { id: 6, name: 'element1', displayName: 'Element Six', value: 4 },
];

storiesOf('Table', module)
  .addDecorator(withKnobs)
  .add('table', () => {
    const disableRow = boolean('disableRow', false);
    const dataSource = object('dataSource', DATA_SOURCE);
    const sticky = boolean('sticky', false);
    return {
      moduleMetadata: {
        imports: [TableModule],
      },
      template: /* HTML */ `
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
            <aui-table-cell *auiTableCellDef="let item">
              <div>{{ item.name }}</div>
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
            *auiTableHeaderRowDef="['id', 'name', 'value']; sticky: sticky"
          ></aui-table-header-row>
          <aui-table-row
            [disabled]="disableRow"
            *auiTableRowDef="let row; columns: ['id', 'name', 'value'];"
          ></aui-table-row>
        </aui-table>
      `,
      props: {
        dataSource,
        disableRow,
        sticky,
      },
    };
  })
  .add('sort', () => ({
    moduleMetadata: {
      imports: [TableModule, SortModule],
      declarations: [SortDemoComponent],
    },
    component: SortDemoComponent,
  }))
  .add('expand', () => ({
    moduleMetadata: {
      imports: [TableModule, IconModule, BrowserAnimationsModule],
      declarations: [ExpandDemoComponent],
    },
    component: ExpandDemoComponent,
  }))
  .add('sticky-columns', () => ({
    moduleMetadata: {
      imports: [TableModule],
      declarations: [StickyColumnsDemoComponent],
    },
    component: StickyColumnsDemoComponent,
  }))
  .add('virtual scroll', () => ({
    moduleMetadata: {
      imports: [TableModule, ScrollingModule],
      declarations: [FixedSizeVirtualScrollDemoComponent],
    },
    component: FixedSizeVirtualScrollDemoComponent,
  }));

export interface Element {
  id: number;
  name: string;
  displayName: string;
  value: number;
}
