import { NgModule } from '@angular/core';

import { FixedSizeTableVirtualScrollDirective } from './fixed-size-table-virtual-scroll.directive';
import { FixedSizeVirtualScrollDirective } from './fixed-size-virtual-scroll.directive';
import { VirtualForOfDirective } from './virtual-for-of.directive';
import { VirtualScrollViewportComponent } from './virtual-scroll-viewport.component';

const EXPORTABLE_COMPONENTS = [VirtualScrollViewportComponent];
const EXPORTABLE_DIRECTIVES = [
  FixedSizeTableVirtualScrollDirective,
  FixedSizeVirtualScrollDirective,
  VirtualForOfDirective,
];

const EXPORTABLE = [...EXPORTABLE_COMPONENTS, ...EXPORTABLE_DIRECTIVES];

@NgModule({
  declarations: EXPORTABLE,
  exports: EXPORTABLE,
})
export class ScrollingModule {}
