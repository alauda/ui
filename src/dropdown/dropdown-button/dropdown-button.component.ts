import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { ButtonType } from '../../button/public-api';
import { ComponentSize } from '../../types';
import { Bem, buildBem } from '../../utils/bem';
import { coerceAttrBoolean } from '../../utils/coercion';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'aui-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class DropdownButtonComponent {
  bem: Bem = buildBem('aui-dropdown-button');

  @Input()
  type = ButtonType.Default;

  @Input()
  plain = true;

  @Input()
  size = ComponentSize.Medium;

  @Input()
  loading = false;

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(val) {
    this._disabled = coerceAttrBoolean(val);
  }

  @Output()
  buttonClick = new EventEmitter<Event>();

  @ContentChild(MenuComponent, { static: true })
  menu: MenuComponent;

  get disableTrigger() {
    return !this.menu?.hasEnabledItem;
  }

  private _disabled = false;
}
