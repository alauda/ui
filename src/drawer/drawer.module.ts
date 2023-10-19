import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon';

import { DrawerComponent } from './component/drawer.component';
import {
  DrawerContentDirective,
  DrawerFooterDirective,
  DrawerHeaderDirective,
} from './component/helper-directives';
import { DrawerService } from './drawer.service';

const COMMON = [
  DrawerComponent,
  DrawerHeaderDirective,
  DrawerContentDirective,
  DrawerFooterDirective,
];

@NgModule({
  imports: [CommonModule, IconModule, OverlayModule, PortalModule, ...COMMON],
  exports: COMMON,
  providers: [DrawerService],
})
export class DrawerModule {}
