import { Directive } from '@angular/core';

@Directive({
  selector: '[auiMenuGroupTitle]',
  exportAs: 'auiMenuGroupTitle',
  host: {
    '[class.aui-menu-group__title]': 'true',
  },
})
export class MenuGroupTitleDirective {}
