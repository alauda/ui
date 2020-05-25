import { Component, ChangeDetectionStrategy } from '@angular/core';
import { auiIcons as icons } from '../../../src/icon/icons';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['style.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconListComponent {
  iconList = icons
    .match(/id="\S+"/g)
    .map(icon => icon.slice(4, -1).replace('aui-icon-', ''));
}
