import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'aui-virtual-scroll-viewport',
  templateUrl: 'virtual-scroll-viewport.component.html',
  styleUrls: ['virtual-scroll-viewport.component.scss'],
  host: {
    class: 'aui-virtual-scroll-viewport',
    '[class.aui-virtual-scroll-orientation-horizontal]':
      'orientation === "horizontal"',
    '[class.aui-virtual-scroll-orientation-vertical]':
      'orientation !== "horizontal"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [
    {
      provide: CdkVirtualScrollViewport,
      useExisting: VirtualScrollViewportComponent,
    },
  ],
  standalone: true,
})
export class VirtualScrollViewportComponent extends CdkVirtualScrollViewport {}
