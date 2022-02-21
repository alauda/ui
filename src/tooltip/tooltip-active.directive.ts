import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { BaseTooltip } from './base-tooltip';

@Directive({
  selector: '[auiTooltipActive]',
})
export class TooltipActiveDirective {
  @Input('auiTooltipActive')
  customClass: string | string[] = '';

  constructor(
    tooltipDirective: BaseTooltip,
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
  ) {
    tooltipDirective.show.subscribe(() => {
      this.addClass();
    });
    tooltipDirective.hide.subscribe(() => {
      this.removeClass();
    });
  }

  private addClass() {
    const classArr =
      typeof this.customClass === 'string'
        ? this.customClass.split(' ')
        : this.customClass;
    classArr.forEach(name => {
      this.renderer.addClass(this.el.nativeElement, name);
    });
  }

  private removeClass() {
    const classArr =
      typeof this.customClass === 'string'
        ? this.customClass.split(' ')
        : this.customClass;
    classArr.forEach(name => {
      this.renderer.removeClass(this.el.nativeElement, name);
    });
  }
}
