import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';

import { NavItemComponent } from '../nav-item/nav-item.component';

@Directive({
  selector: '*[auiNavItemGroupTitle]',
  exportAs: 'auiNavItemGroupTitle',
})
export class NavItemGroupTitleDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: 'aui-nav-item-group',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class NavItemGroupComponent {
  @ContentChild(NavItemGroupTitleDirective)
  title: NavItemGroupTitleDirective;

  @ContentChildren(forwardRef(() => NavItemComponent))
  items: QueryList<NavItemComponent>;
}
