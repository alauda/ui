import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AnchorComponent, AnchorTreeComponent } from './anchor.component';
import { AnchorDirective, AnchorLabelDirective } from './anchor.directive';

@NgModule({
  imports: [
    CommonModule,
    AnchorComponent,
    AnchorTreeComponent,
    AnchorDirective,
    AnchorLabelDirective,
  ],
  exports: [
    AnchorComponent,
    AnchorTreeComponent,
    AnchorDirective,
    AnchorLabelDirective,
  ],
})
export class AnchorModule {}

export const ANCHOR_MODULE = [
  AnchorComponent,
  AnchorTreeComponent,
  AnchorDirective,
  AnchorLabelDirective,
] as const;
