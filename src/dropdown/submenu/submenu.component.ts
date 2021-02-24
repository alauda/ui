import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';

import { TooltipTrigger } from '../../tooltip/public-api';
import { ComponentSize } from '../../types';
import { Bem, buildBem } from '../../utils/bem';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'aui-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class SubmenuComponent extends MenuItemComponent {
  bem: Bem = buildBem('aui-submenu');

  @Input()
  trigger = TooltipTrigger.Hover;

  @Input()
  size: ComponentSize = ComponentSize.Medium;

  @Input()
  get disabled() {
    return this._disabled || !this.hasEnabledItem;
  }

  @ContentChildren(MenuItemComponent, { descendants: true })
  menuItems: QueryList<MenuItemComponent>;

  get hasEnabledItem() {
    return this.menuItems?.length > 0;
  }
}
