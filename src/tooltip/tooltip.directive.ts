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
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { BaseTooltip } from './base-tooltip';
import { TooltipTrigger, TooltipType } from './tooltip.types';

@Directive({
  selector: '[auiTooltip]',
  providers: [
    TooltipDirective,
    {
      provide: BaseTooltip,
      useExisting: TooltipDirective,
    },
  ],
  exportAs: 'auiTooltip',
})
export class TooltipDirective extends BaseTooltip {
  @Input('auiTooltip')
  content: string | TemplateRef<any>;

  @Input('auiTooltipContext')
  context: any;

  @Input('auiTooltipClass')
  class: string;

  @Input('auiTooltipType')
  type: TooltipType;

  @Input('auiTooltipPosition')
  position: string;

  @Input('auiTooltipTrigger')
  trigger: TooltipTrigger;

  @Input('auiTooltipDisabled')
  disabled: boolean;

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
