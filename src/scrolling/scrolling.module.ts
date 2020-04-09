import { NgModule } from '@angular/core';

import { FixedSizeVirtualScrollDirective } from './fixed-size-virtual-scroll.directive';
import { VirtualForOfDirective } from './virtual-for-of.directive';
import { VirtualScrollViewportComponent } from './virtual-scroll-viewport.component';

const EXPORTABLE_COMPONENTS = [VirtualScrollViewportComponent];
const EXPORTABLE_DIRECTIVES = [
  FixedSizeVirtualScrollDirective,
  VirtualForOfDirective,
];

const EXPORTABLE = [...EXPORTABLE_COMPONENTS, ...EXPORTABLE_DIRECTIVES];

@NgModule({
  declarations: EXPORTABLE,
  exports: EXPORTABLE,
})
export class ScrollingModule {}
