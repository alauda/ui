import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_SOURCE } from '../data';

@Component({
  templateUrl: 'expand-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandDemoComponent {
  dataSource = DATA_SOURCE.slice();

  rowExpanded = new Set<number>();

  toggleRow(id: number) {
    if (this.rowExpanded.has(id)) {
      this.rowExpanded.delete(id);
    } else {
      this.rowExpanded.add(id);
    }
  }
}
