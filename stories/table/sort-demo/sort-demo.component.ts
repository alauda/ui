import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_SOURCE, Element } from '../data';

import { Sort } from '@alauda/ui';

@Component({
  selector: 'sort-table-demo',
  templateUrl: 'sort-demo.component.html',
  styleUrls: ['sort-demo.component.scss'],
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
