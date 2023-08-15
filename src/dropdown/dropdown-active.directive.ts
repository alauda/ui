import { Directive, Input } from '@angular/core';

import { TooltipActiveDirective } from '../tooltip';

@Directive({
  selector: '[auiDropdownActive]',
  standalone: true,
})
export class DropdownActiveDirective extends TooltipActiveDirective {
  @Input('auiDropdownActive')
  override customClass: string | string[] = '';
}
