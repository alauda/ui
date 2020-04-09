import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { NavGroupConfig, NavItemConfig, NavItemKey } from '../nav-menu.types';

@Component({
  selector: 'aui-platform-nav',
  templateUrl: './platform-nav.component.html',
  styleUrls: ['./platform-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class PlatformNavComponent {
  @Input() items: NavItemConfig[];
  @Input() groups: NavGroupConfig[];
  @Input() mainPanelCollapsed = false;
  @Input() secondaryPanelCollapsed = false;
  @Input() hideMainPanelToggle = false;
  @Input() hideSecondaryPanelToggle = false;
  @Input() activatedKey: NavItemKey;
  @Input() theme = 'dark';

  @Output() mainPanelCollapsedChange = new EventEmitter<boolean>();
  @Output() secondaryPanelCollapsedChange = new EventEmitter<boolean>();
  @Output() activatedKeyChange = new EventEmitter<NavItemKey>();
  @Output() activatedItemChange = new EventEmitter<NavItemConfig>();

  handleActivatedKeyChange(key: NavItemKey) {
    this.activatedKeyChange.emit(key);
    this.activatedItemChange.emit(this.findActivatedItem(key));
  }

  trackByKey(_: number, item: NavItemConfig) {
    return item.key;
  }

  private findActivatedItem(key: NavItemKey) {
    const items =
      this.items ||
      this.groups.reduce(
        (prevValue, currValue) => [...prevValue, ...currValue.items],
        [],
      );
    return this.flatItems(items).find(item => item.key === key);
  }

  private flatItems(items: NavItemConfig[]): NavItemConfig[] {
    return items.reduce(
      (prevValue, currValue) =>
        currValue.children
          ? [...prevValue, ...this.flatItems(currValue.children)]
          : [...prevValue, currValue],
      [],
    );
  }
}
