import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';

import { DATA_SOURCE } from '../data';

@Component({
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {
  dataSource = DATA_SOURCE.slice(0, 3);

  show$$ = new Subject();

  constructor() {
    setTimeout(() => this.show$$.next(true));
  }
}
