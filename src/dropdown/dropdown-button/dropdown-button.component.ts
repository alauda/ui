import { AsyncPipe } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, map, startWith } from 'rxjs';

import { ButtonType } from '../../button';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { ComponentSize } from '../../internal/types';
import { Bem, buildBem, coerceAttrBoolean } from '../../internal/utils';
import { DropdownDirective } from '../dropdown.directive';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'aui-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  standalone: true,
  imports: [ButtonComponent, DropdownDirective, IconComponent, AsyncPipe],
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
