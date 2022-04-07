import {
  CdkFixedSizeVirtualScroll,
  VIRTUAL_SCROLL_STRATEGY,
  _fixedSizeVirtualScrollStrategyFactory,
} from '@angular/cdk/scrolling';
import { Directive, forwardRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'aui-virtual-scroll-viewport[itemSize]',
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: _fixedSizeVirtualScrollStrategyFactory,
      deps: [forwardRef(() => FixedSizeVirtualScrollDirective)],
    },
  ],
})
export class FixedSizeVirtualScrollDirective extends CdkFixedSizeVirtualScroll {}
