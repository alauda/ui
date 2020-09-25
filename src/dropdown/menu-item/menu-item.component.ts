import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem } from '../../utils/bem';
import { MenuItemType } from '../dropdown.types';

@Component({
  selector: 'aui-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class MenuItemComponent {
  bem: Bem = buildBem('aui-menu-item');

  protected _disabled = false;

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    this._disabled = value;
  }

  @Input()
  divide = false;

  @Input()
  type = MenuItemType.Default;

  @Input()
  actived = false;

  get className() {
    return `${this.bem.block(this.type)} ${this.divide ? 'hasDivider' : ''} ${
      this.actived ? 'isActive' : ''
    }`;
  }
}
