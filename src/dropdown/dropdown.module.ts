import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { TooltipModule } from '../tooltip';

import { DropdownActiveDirective } from './dropdown-active.directive';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { DropdownDirective } from './dropdown.directive';
import { MenuGroupTitleDirective } from './helper-directives';
import { MenuComponent } from './menu/menu.component';
import { MenuGroupComponent } from './menu-group/menu-group.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { SubmenuComponent } from './submenu/submenu.component';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    IconModule,
    ButtonModule,
    DropdownDirective,
    DropdownActiveDirective,
    DropdownButtonComponent,
    MenuComponent,
    MenuGroupComponent,
    MenuGroupTitleDirective,
    MenuItemComponent,
    SubmenuComponent,
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
  ],
})
export class DropdownModule {}

export const DROPDOWN_MODULE = [
  DropdownDirective,
  DropdownActiveDirective,
  DropdownButtonComponent,
  MenuComponent,
  MenuGroupComponent,
  MenuGroupTitleDirective,
  MenuItemComponent,
  SubmenuComponent,
] as const;
