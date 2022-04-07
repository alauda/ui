import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_SOURCE } from '../data';

@Component({
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {
  dataSource = DATA_SOURCE.slice(0, 3);
}
