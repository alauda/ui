import { Directive } from '@angular/core';

@Directive({
  selector: '[auiInlineAlertTitle]',
  exportAs: 'auiInlineAlertTitle',
  standalone: true,
})
export class InlineAlertTitleDirective {}
