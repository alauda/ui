import { Directive, Input } from '@angular/core';

import { TooltipActiveDirective } from '../tooltip/public-api';

@Directive({
  selector: '[auiDropdownActive]',
})
export class DropdownActiveDirective extends TooltipActiveDirective {
  @Input('auiDropdownActive')
  customClass: string | string[];
}
