import { Directive, EventEmitter, Input, Output } from '@angular/core';

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
  @Input('auiTooltipHideOnClick')
  override hideOnClick = false;

  @Output('auiTooltipShow')
  override show = new EventEmitter<void>();

  @Output('auiTooltipHide')
  override hide = new EventEmitter<void>();
}
