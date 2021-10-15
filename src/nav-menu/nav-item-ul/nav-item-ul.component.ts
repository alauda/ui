import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { NavGroupConfig, NavItemConfig, NavItemKey } from './../nav-menu.types';

@Component({
  selector: 'aui-nav-item-ul',
  templateUrl: './nav-item-ul.component.html',
  styleUrls: ['./nav-item-ul.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class NavItemUlComponent {
  @Input() items: NavItemConfig[];
  @Input() groups: NavGroupConfig[];
  @Input() mainPanelCollapsed = true;

  @Output() focusedItemChanged = new EventEmitter<NavItemKey>();

  trackByKey(_: number, item: NavItemConfig) {
    return item.key;
  }
}
