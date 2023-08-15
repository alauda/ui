import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { TooltipModule } from '../tooltip';

import { DropdownActiveDirective } from './dropdown-active.directive';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { DropdownDirective } from './dropdown.directive';
import { MenuGroupTitleDirective } from './helper-directives';
import { MenuContentDirective } from './menu/menu-content.directive';
import { MenuComponent } from './menu/menu.component';
import { MenuGroupComponent } from './menu-group/menu-group.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { SubmenuComponent } from './submenu/submenu.component';

@NgModule({
  imports: [CommonModule, TooltipModule, IconModule, ButtonModule],
  declarations: [
    DropdownDirective,
    DropdownActiveDirective,
    DropdownButtonComponent,
    MenuComponent,
    MenuGroupComponent,
    MenuGroupTitleDirective,
    MenuItemComponent,
    SubmenuComponent,
    MenuContentDirective,
  ],
  exports: [
    DropdownDirective,
    DropdownActiveDirective,
    DropdownButtonComponent,
    MenuComponent,
    MenuGroupComponent,
    MenuGroupTitleDirective,
    MenuItemComponent,
    SubmenuComponent,
    MenuContentDirective,
  ],
})
export class DropdownModule {}
