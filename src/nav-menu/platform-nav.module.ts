import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/public-api';

import { NavMenuModule } from './nav-menu.module';
import { PlatformNavComponent } from './platform-nav/platform-nav.component';

@NgModule({
  imports: [CommonModule, NavMenuModule, IconModule],
  declarations: [PlatformNavComponent],
  exports: [PlatformNavComponent],
})
export class PlatformNavModule {}
