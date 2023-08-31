import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipActiveDirective } from './tooltip-active.directive';
import { TooltipCopyDirective } from './tooltip-copy.directive';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    TooltipDirective,
    TooltipComponent,
    TooltipActiveDirective,
    TooltipCopyDirective,
  ],
  exports: [TooltipDirective, TooltipActiveDirective, TooltipCopyDirective],
})
export class TooltipModule {}
