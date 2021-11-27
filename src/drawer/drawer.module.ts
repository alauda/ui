import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/public-api';

import { DrawerComponent } from './component/drawer.component';
import { DrawerService } from './component/drawer.service';
import {
  DrawerContentDirective,
  DrawerFooterDirective,
  DrawerHeaderDirective,
} from './component/helper-directives';

const COMMON = [
  DrawerComponent,
  DrawerHeaderDirective,
  DrawerContentDirective,
  DrawerFooterDirective,
];
@NgModule({
  imports: [CommonModule, IconModule, IconModule, OverlayModule, PortalModule],
  declarations: COMMON,
  exports: COMMON,
  providers: [DrawerService],
  entryComponents: [DrawerComponent],
})
export class DrawerModule {}
