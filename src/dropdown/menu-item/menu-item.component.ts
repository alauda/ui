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

  @Input()
  disabled = false;

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
