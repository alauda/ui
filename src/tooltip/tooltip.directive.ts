import { Directive, EventEmitter, Output } from '@angular/core';

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
    'hideOnClick:auiTooltipHideOnClick',
  ],
})
export class TooltipDirective extends BaseTooltip {
  @Output('auiTooltipShow')
  override showed = new EventEmitter<void>();

  @Output('auiTooltipHide')
  override hided = new EventEmitter<void>();
}
