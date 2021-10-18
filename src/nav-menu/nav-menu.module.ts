import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/public-api';
import { TooltipModule } from '../tooltip/public-api';

import {
  NavItemGroupComponent,
  NavItemGroupTitleDirective,
} from './nav-item-group/nav-item-group.component';
import { NavItemLiComponent } from './nav-item-li/nav-item-li.component';
import { NavItemUlComponent } from './nav-item-ul/nav-item-ul.component';
import {
  NavItemComponent,
  NavItemContentDirective,
  NavItemIconDirective,
} from './nav-item/nav-item.component';
import { NavMenuComponent } from './nav-menu.component';

@NgModule({
  imports: [CommonModule, ScrollingModule, IconModule, TooltipModule],
  declarations: [
    NavMenuComponent,
    NavItemGroupComponent,
    NavItemComponent,
    NavItemIconDirective,
    NavItemContentDirective,
    NavItemGroupTitleDirective,
    NavItemUlComponent,
    NavItemLiComponent,
  ],
  exports: [
    NavMenuComponent,
    NavItemGroupComponent,
    NavItemComponent,
    NavItemIconDirective,
    NavItemContentDirective,
    NavItemGroupTitleDirective,
  ],
})
export class NavMenuModule {}
