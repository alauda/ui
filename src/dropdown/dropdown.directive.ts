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

import { BaseTooltip, TooltipTrigger, TooltipType } from '../tooltip';
import { AnimationType } from '../tooltip/animations';

import { DropdownActiveDirective } from './dropdown-active.directive';

@Directive({
  selector: '[auiDropdown]',
  exportAs: 'auiDropdown',
  inputs: [
    'class:auiDropdownClass',
    'disabled:auiDropdownDisabled',
    'position:auiDropdownPosition',
    'trigger:auiDropdownTrigger',
    'context:auiDropdownContext',
    'content:auiDropdown',
  ],
  providers: [
    {
      provide: BaseTooltip,
      useExisting: DropdownDirective,
    },
  ],
  standalone: true,
})
export class DropdownDirective extends BaseTooltip {
  @Input('auiDropdownHideOnClick')
  override hideOnClick = true;

  @Output('auiDropdownVisibleChange')
  override visibleChange = new EventEmitter<boolean>();

  override animationType: AnimationType = 'scaleY';

  constructor(
    overlay: Overlay,
    viewContainerRef: ViewContainerRef,
    elRef: ElementRef,
    renderer: Renderer2,
    cdr: ChangeDetectorRef,
    ngZone: NgZone,
  ) {
    super(overlay, viewContainerRef, elRef, renderer, cdr, ngZone);
    new DropdownActiveDirective(this, elRef, renderer).customClass = 'isActive';
    this.type = TooltipType.Plain;
    this.position = 'bottom end';
    this.trigger = TooltipTrigger.Click;
  }
}
