import { Overlay } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { writeText } from 'clipboard-polyfill';

import { BaseTooltip } from './base-tooltip';
import { TooltipCopyIntl } from './tooltip-intl';

@Directive({
  selector: '[auiTooltipCopy]',
  inputs: ['position:auiTooltipPosition', 'disabled:auiTooltipDisabled'],
})
export class TooltipCopyDirective extends BaseTooltip implements OnInit {
  @Input()
  get auiTooltipCopy() {
    return this._copyText || this.elRef.nativeElement.textContent;
  }

  set auiTooltipCopy(value: string) {
    this._copyText = value;
  }

  @Input()
  get auiTooltipCopyTip() {
    return this._copyTip || this.toolTipIntl.copyTip;
  }

  set auiTooltipCopyTip(value: string) {
    this._copyTip = value;
  }

  @Input()
  get auiTooltipCopySuccessTip() {
    return this._copySuccessTip || this.toolTipIntl.copySuccessTip;
  }

  set auiTooltipCopySuccessTip(value: string) {
    this._copySuccessTip = value;
  }

  @Input()
  get auiTooltipCopyFailTip() {
    return this._copyFailTip || this.toolTipIntl.copyFailTip;
  }

  set auiTooltipCopyFailTip(value: string) {
    this._copyFailTip = value;
  }

  private _copyText: string;
  private _copyTip: string;
  private _copySuccessTip: string;
  private _copyFailTip: string;

  constructor(
    overlay: Overlay,
    viewContainerRef: ViewContainerRef,
    elRef: ElementRef,
    renderer: Renderer2,
    cdr: ChangeDetectorRef,
    ngZone: NgZone,
    private readonly toolTipIntl: TooltipCopyIntl,
  ) {
    super(overlay, viewContainerRef, elRef, renderer, cdr, ngZone);
  }

  ngOnInit() {
    this.content = this.auiTooltipCopyTip;
    this.hide.subscribe(() => {
      this.content = this.auiTooltipCopyTip;
    });
  }

  @HostListener('click')
  async onSourceClick() {
    if (!this.disabled) {
      try {
        await writeText(this.auiTooltipCopy);
        this.content = this.auiTooltipCopySuccessTip;
      } catch {
        this.content = this.auiTooltipCopyFailTip;
      }
    }
  }
}
