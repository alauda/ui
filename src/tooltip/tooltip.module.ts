import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipActiveDirective } from './tooltip-active.directive';
import { TooltipCopyDirective } from './tooltip-copy.directive';
import { TOOLTIP_COPY_INTL_INTL_PROVIDER } from './tooltip-intl';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [
    TooltipDirective,
    TooltipComponent,
    TooltipActiveDirective,
    TooltipCopyDirective,
  ],
  entryComponents: [TooltipComponent],
  exports: [TooltipDirective, TooltipActiveDirective, TooltipCopyDirective],
  providers: [TOOLTIP_COPY_INTL_INTL_PROVIDER],
})
export class TooltipModule {}
