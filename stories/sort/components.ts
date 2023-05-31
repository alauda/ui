import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Sort } from '@alauda/ui';

interface Element {
  id: number;
  name: string;
  displayName: string;
  value: number;
}

const DATA_SOURCE: Element[] = [
  { id: 1, name: 'element1', displayName: 'Element One', value: 5 },
  { id: 3, name: 'element3', displayName: 'Element Three', value: 2 },
  { id: 4, name: 'element4', displayName: 'Element Four', value: 9 },
  { id: 5, name: 'element5', displayName: 'Element Five', value: 3 },
  { id: 6, name: 'element6', displayName: 'Element Six', value: 4 },
  { id: 2, name: 'element2', displayName: 'Element Two', value: 8 },
];

@Component({
  template: `
    <table
      auiSort
      (sortChange)="sortData($event)"
    >
      <tr>
        <th aui-sort-header="id">No.</th>
        <th aui-sort-header="name">Name</th>
        <th
          aui-sort-header="value"
          start="desc"
        >
          Value
        </th>
      </tr>
      <tr *ngFor="let item of dataSource">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.value }}</td>
      </tr>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  dataSource = DATA_SOURCE.slice();

  sortData(sort: Sort) {
    const activeKey = sort.active as keyof Element;
    this.dataSource.sort((a, b) =>
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
