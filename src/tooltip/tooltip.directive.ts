import { Directive, EventEmitter, Input, Output } from '@angular/core';

import { AnimationType } from './animations';
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
  standalone: true,
})
export class TooltipDirective extends BaseTooltip {
  @Output('auiTooltipVisibleChange')
  override visibleChange = new EventEmitter<boolean>();

  @Input('auiTooltipAnimType')
  override animationType: AnimationType = 'scale';
}
