import { Directive, Input } from '@angular/core';

import { TooltipActiveDirective } from '../tooltip';

@Directive({
  selector: '[auiDropdownActive]',
})
export class DropdownActiveDirective extends TooltipActiveDirective {
  @Input('auiDropdownActive')
  override customClass: string | string[] = '';
}
