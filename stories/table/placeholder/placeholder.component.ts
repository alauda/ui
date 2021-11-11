import { Component } from '@angular/core';

import { DATA_SOURCE } from '../data';

@Component({
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
})
export class PlaceholderComponent {
  dataSource = DATA_SOURCE.slice();
}
