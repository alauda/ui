import { Directive } from '@angular/core';

@Directive({
  selector: '[auiOptionGroupTitle]',
  exportAs: 'auiOptionGroupTitle',
  host: {
    '[class.aui-option-group__title]': 'true',
  },
})
export class OptionGroupTitleDirective {}
