import { Directive } from '@angular/core';

@Directive({
  selector: '[auiOptionGroupTitle]',
  exportAs: 'auiOptionGroupTitle',
  host: {
    '[class.aui-option-group__title]': 'true',
  },
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class OptionGroupTitleDirective {}
