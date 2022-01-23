import { AfterViewInit, Directive, ElementRef } from '@angular/core';

const simplifyString = (str: string) =>
  str
    .replaceAll('\r', '')
    .replaceAll('\n', '')
    .replaceAll('\\s', '')
    .replaceAll(' ', '');

@Directive({
  selector: '[click]',
})
export class E2eAttributeBindingDirective implements AfterViewInit {
  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.setId();
  }

  setId() {
    const currentAttr = simplifyString(
      this.el.nativeElement.getAttribute('data-test') ||
        simplifyString(
          this.el.nativeElement.nodeName +
            '/' +
            this.el.nativeElement.textContent,
        ),
    );
    if (currentAttr !== this.el.nativeElement.getAttribute('data-test')) {
      this.el.nativeElement.dataset.test = currentAttr;
    }
  }
}
