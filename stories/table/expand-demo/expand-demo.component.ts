import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_SOURCE } from '..';

interface Dictionary<T> {
  [key: string]: T;
}

@Component({
  templateUrl: 'expand-demo.component.html',
  styleUrls: ['expand-demo.component.scss'],
  animations: [
    trigger('expand', [
      state('*', style({ height: 0 })),
      state('expanded', style({ height: '*' })),
      transition('* => expanded', [animate(250)]),
      transition('expanded => *', [animate(250)]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandDemoComponent {
  dataSource = DATA_SOURCE.slice();

  rowExpanded: Dictionary<boolean> = {};

  toggleRow(id: number) {
    this.rowExpanded = {
      ...this.rowExpanded,
      [id]: !this.rowExpanded[id],
    };
  }
}
