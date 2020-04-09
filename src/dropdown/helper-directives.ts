import { Directive } from '@angular/core';

@Directive({
  selector: '[auiMenuGroupTitle]',
  exportAs: 'auiMenuGroupTitle',
  host: {
    '[class.aui-menu-group__title]': 'true',
  },
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MenuGroupTitleDirective {}
