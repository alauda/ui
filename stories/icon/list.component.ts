import { ChangeDetectionStrategy, Component } from '@angular/core';

import { auiIcons as icons } from '../../src/icon/icons';

@Component({
  template: ` <ul>
    <li *ngFor="let icon of iconList">
      <aui-icon [icon]="icon"></aui-icon>
      <div>{{ icon }}</div>
    </li>
  </ul>`,
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconListComponent {
  iconList = icons
    .match(/id="\S+"/g)
    .map(icon => icon.slice(4, -1).replace('aui-icon-', ''))
    .sort((a, b) => a.localeCompare(b));
}
