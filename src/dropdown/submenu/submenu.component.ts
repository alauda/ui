import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';

import { IconComponent } from '../../icon/icon.component';
import { ComponentSize } from '../../internal/types';
import { Bem, buildBem } from '../../internal/utils';
import { TooltipTrigger } from '../../tooltip';
import { TooltipActiveDirective } from '../../tooltip/tooltip-active.directive';
import { TooltipDirective } from '../../tooltip/tooltip.directive';
import { MenuComponent } from '../menu/menu.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'aui-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  imports: [
    TooltipActiveDirective,
    TooltipDirective,
    IconComponent,
    MenuComponent,
  ],
})
export class SubmenuComponent extends MenuItemComponent {
  override bem: Bem = buildBem('aui-submenu');

  @Input()
  trigger = TooltipTrigger.Hover;

  @Input()
  size: ComponentSize = ComponentSize.Small;

  @Input()
  override get disabled() {
    return this._disabled || !this.hasEnabledItem;
  }

  @ContentChildren(MenuItemComponent, { descendants: true })
  menuItems: QueryList<MenuItemComponent>;

  get hasEnabledItem() {
    return this.menuItems?.length > 0;
  }
}
