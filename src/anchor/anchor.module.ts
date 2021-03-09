import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AnchorComponent, AnchorTreeComponent } from './anchor.component';
import { AnchorDirective, AnchorLabelDirective } from './anchor.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
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
  entryComponents: [AnchorComponent],
})
export class AnchorModule {}
