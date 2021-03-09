import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { ComponentSize } from '../../types';
import { Bem, buildBem } from '../../utils';
import { MenuItemComponent } from '../menu-item/menu-item.component';

import { MenuContentDirective } from './menu-content.directive';

@Component({
  selector: 'aui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class MenuComponent {
  bem: Bem = buildBem('aui-menu');

  @Input()
  size: ComponentSize = ComponentSize.Small;

  @ViewChild(TemplateRef, { static: true })
  template: TemplateRef<any>;

  @ContentChild(MenuContentDirective, { static: true })
  lazyContent: MenuContentDirective;

  @ContentChildren(MenuItemComponent, { descendants: true })
  menuItems: QueryList<MenuItemComponent>;

  get hasEnabledItem() {
    return this.menuItems?.length > 0;
  }
}
