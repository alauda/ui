import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, map, startWith } from 'rxjs';

import { ButtonType } from '../../button';
import { ComponentSize } from '../../types';
import { Bem, buildBem, coerceAttrBoolean } from '../../utils';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'aui-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class DropdownButtonComponent implements AfterContentInit {
  bem: Bem = buildBem('aui-dropdown-button');

  @Input()
  type: ButtonType = ButtonType.Default;

  @Input()
  plain = true;

  @Input()
  size: ComponentSize = ComponentSize.Medium;

  @Input()
  loading = false;

  @Input({ transform: coerceAttrBoolean })
  disabled: boolean;

  @Output()
  buttonClick = new EventEmitter<Event>();

  @ContentChild(MenuComponent, { static: true })
  menu: MenuComponent;

  @ContentChildren(MenuItemComponent, { descendants: true })
  private readonly menuItems: QueryList<MenuItemComponent>;

  disableTrigger$: Observable<boolean>;

  ngAfterContentInit() {
    this.disableTrigger$ = this.menuItems.changes.pipe(
      startWith(null),
      map(() => this.menuItems.length === 0),
    );
  }
}
