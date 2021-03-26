// tslint:disable: no-output-rename
import { Overlay } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';

import { BaseTooltip } from './base-tooltip';

@Directive({
  selector: '[auiTooltip]',
  providers: [
    {
      provide: BaseTooltip,
      useExisting: TooltipDirective,
    },
  ],
  exportAs: 'auiTooltip',
  inputs: [
    'content:auiTooltip',
    'context:auiTooltipContext',
    'class:auiTooltipClass',
    'type:auiTooltipType',
    'position:auiTooltipPosition',
    'trigger:auiTooltipTrigger',
    'disabled:auiTooltipDisabled',
  ],
})
export class TooltipDirective extends BaseTooltip {
  @Input('auiTooltipDelay')
  delay = 50;

  @Input('auiTooltipHideOnClick')
  hideOnClick: boolean;

  @Output('auiTooltipShow')
  show: EventEmitter<void>;

  @Output('auiTooltipHide')
  hide: EventEmitter<void>;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    overlay: Overlay,
    viewContainerRef: ViewContainerRef,
    elRef: ElementRef,
    renderer: Renderer2,
    cdr: ChangeDetectorRef,
    ngZone: NgZone,
  ) {
    super(overlay, viewContainerRef, elRef, renderer, cdr, ngZone);
  }
}
