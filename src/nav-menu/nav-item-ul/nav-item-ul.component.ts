import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';

import { NavItemGroupComponent } from '../nav-item-group/nav-item-group.component';
import { NavItemComponent } from '../nav-item/nav-item.component';
import { NavItemKey } from '../nav-menu.types';

@Component({
  selector: 'aui-nav-item-ul',
  templateUrl: './nav-item-ul.component.html',
  styleUrls: ['./nav-item-ul.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class NavItemUlComponent {
  @Input() items: QueryList<NavItemComponent> | NavItemComponent[];
  @Input() groups: QueryList<NavItemGroupComponent>;
  @Input() mainPanelCollapsed = true;

  @Output() focusedItemChanged = new EventEmitter<NavItemKey>();

  trackByKey(_: number, item: NavItemComponent) {
    return item.key;
  }
}
