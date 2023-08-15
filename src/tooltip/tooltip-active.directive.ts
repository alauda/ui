import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BaseTooltip } from './base-tooltip';

@Directive({
  selector: '[auiTooltipActive]',
  standalone: true,
})
export class TooltipActiveDirective implements OnDestroy {
  @Input('auiTooltipActive')
  customClass: string | string[] = '';

  destroy$ = new Subject();

  constructor(
    tooltipDirective: BaseTooltip,
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
  ) {
    tooltipDirective.visibleChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(visible => {
        this[visible ? 'addClass' : 'removeClass']();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
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
