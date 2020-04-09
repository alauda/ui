import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/public-api';
import { IconModule } from '../icon/public-api';
import { TooltipModule } from '../tooltip/public-api';

import { DropdownActiveDirective } from './dropdown-active.directive';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { DropdownDirective } from './dropdown.directive';
import { MenuGroupTitleDirective } from './helper-directives';
import { MenuGroupComponent } from './menu-group/menu-group.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuContentDirective } from './menu/menu-content.directive';
import { MenuComponent } from './menu/menu.component';
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
