import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_SOURCE } from '../data';

@Component({
  templateUrl: 'expand-demo.component.html',
  styleUrls: ['expand-demo.component.scss'],
  animations: [
    trigger('expand', [
      state('*', style({ height: 0 })),
      state('expanded', style({ height: '*', 'margin-bottom': '0' })),
      transition('* => expanded', [animate(250)]),
      transition('expanded => *', [animate(250)]),
    ]),
  ],
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
