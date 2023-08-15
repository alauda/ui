import { Directive } from '@angular/core';

import { MenuContentDirective } from '../dropdown';

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
  selector: '*[auiOptionContent]',
  exportAs: 'auiOptionContent',
  standalone: true,
})
export class OptionContentDirective extends MenuContentDirective {}
