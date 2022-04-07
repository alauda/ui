import { Directive } from '@angular/core';

import { MenuContentDirective } from '../dropdown';

@Directive({
  selector: '[auiOptionGroupTitle]',
  exportAs: 'auiOptionGroupTitle',
  host: {
    '[class.aui-option-group__title]': 'true',
  },
})
export class OptionGroupTitleDirective {}

@Directive({
  selector: '*[auiOptionContent]',
  exportAs: 'auiOptionContent',
})
export class OptionContentDirective extends MenuContentDirective {}
