import { AfterViewInit, Directive, ElementRef } from '@angular/core';

import { generateDataTestId } from '../utils';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[click],[routerLink],a[href]',
})
export class E2eAttributeBindingDirective implements AfterViewInit {
  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    if (this.el.nativeElement && !this.el.nativeElement.dataset.test) {
      this.el.nativeElement.dataset.test = generateDataTestId(
        this.el.nativeElement,
      );
    }
  }
}
