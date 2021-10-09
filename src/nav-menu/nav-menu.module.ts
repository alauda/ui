import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/public-api';
import { TooltipModule } from '../tooltip/public-api';

import { NavItemLiComponent } from './nav-item-li/nav-item-li.component';
import { NavItemUlComponent } from './nav-item-ul/nav-item-ul.component';
import { NavMenuComponent } from './nav-menu.component';

@NgModule({
  imports: [CommonModule, ScrollingModule, IconModule, TooltipModule],
  declarations: [NavMenuComponent, NavItemUlComponent, NavItemLiComponent],
  exports: [NavMenuComponent],
})
export class NavMenuModule {}
