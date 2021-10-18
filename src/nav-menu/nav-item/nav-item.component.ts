import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  Inject,
  Input,
  Optional,
  QueryList,
  SkipSelf,
  TemplateRef,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';

import { NavItemGroupComponent } from '../nav-item-group/nav-item-group.component';
import { NavItemKey } from '../nav-menu.types';

@Directive({
  selector: '*[auiNavItemIcon]',
  exportAs: 'auiNavItemIcon',
})
export class NavItemIconDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '*[auiNavItemContent]',
  exportAs: 'auiNavItemContent',
})
export class NavItemContentDirective {
  constructor(public template: TemplateRef<any>) {}
}

let uniqueId = 0;

@Component({
  selector: 'aui-nav-item',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class NavItemComponent {
  @ContentChildren(NavItemComponent)
  private readonly _subItems: QueryList<NavItemComponent>;

  private _key: NavItemKey = 'aui-nav-item--' + uniqueId++;

  @Input()
  get key() {
    return this._key;
  }

  set key(val) {
    if (val) {
      this._key = val;
    }
  }

  @Input()
  divider = false;

  @ContentChild(NavItemIconDirective, { static: true })
  icon: NavItemIconDirective;

  @ContentChild(NavItemContentDirective, { static: true })
  content: NavItemContentDirective;

  get subItems() {
    return this._subItems?.filter(item => item !== this);
  }

  depth = 0;
  group: NavItemGroupComponent;

  constructor(
    @SkipSelf()
    @Optional()
    public parentItem: NavItemComponent,
    @Optional()
    @Inject(forwardRef(() => NavItemGroupComponent))
    group: any, // FIXME: workaround temporarily
  ) {
    this.group = group;
    if (parentItem) {
      this.depth = parentItem.depth + 1;
    }
  }
}
