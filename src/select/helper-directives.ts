import { Directive } from '@angular/core';

@Directive({
  selector: '[auiOptionGroupTitle]',
  exportAs: 'auiOptionGroupTitle',
  host: {
    '[class.aui-option-group__title]': 'true',
  },
  standalone: true,
})
export class OptionGroupTitleDirective {}

@Directive({
  selector: '[auiOptionItemCustom]',
  exportAs: 'auiOptionItemCustom',
  standalone: true,
})
export class OptionItemCustomDirective {}
