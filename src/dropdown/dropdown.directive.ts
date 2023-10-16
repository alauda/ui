import { Overlay } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { takeUntil } from 'rxjs';

import { BaseTooltip, TooltipTrigger, TooltipType } from '../tooltip';

import { DropdownActiveDirective } from './dropdown-active.directive';
import { MenuComponent } from './menu/menu.component';

@Directive({
  selector: '[auiDropdown]',
  exportAs: 'auiDropdown',
  inputs: [
    'class:auiDropdownClass',
    'disabled:auiDropdownDisabled',
    'position:auiDropdownPosition',
    'trigger:auiDropdownTrigger',
  ],
  providers: [
    {
      provide: BaseTooltip,
      useExisting: DropdownDirective,
    },
  ],
  standalone: true,
})
export class DropdownDirective extends BaseTooltip implements OnInit {
  @Input('auiDropdown')
  get menu() {
    return this._menu;
  }

  set menu(value) {
    if (value === this._menu) {
      return;
    }
    this._menu = value;
    this.content = value.template;
  }

  @Input('auiDropdownContext')
  lazyContentContext: any;

  @Input('auiDropdownHideOnClick')
  override hideOnClick = true;

  @Output('auiDropdownVisibleChange')
  override visibleChange = new EventEmitter<boolean>();

  private _menu: MenuComponent;

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
    this.disableAnimation = false;
    this.animationType = 'scaleY';
  }

  ngOnInit() {
    this.visibleChange.pipe(takeUntil(this.destroy$)).subscribe(visible => {
      if (this.menu.lazyContent) {
        if (visible) {
          setTimeout(() => {
            this.menu.lazyContent.attach(this.lazyContentContext);
            this.updatePosition();
          });
        } else {
          this.menu.lazyContent.detach();
        }
      }
    });
  }
}
