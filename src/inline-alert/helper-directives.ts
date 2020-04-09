import { Directive } from '@angular/core';

@Directive({
  selector: '[auiInlineAlertTitle]',
  exportAs: 'auiInlineAlertTitle',
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class InlineAlertTitleDirective {}
