import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem } from '../utils/bem';

import { IconRegisterService } from './icon-register.service';

let id = 0;

@Component({
  selector: 'aui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class IconComponent {
  @Input()
  icon = 'none';

  @Input()
  link = '';

  @Input()
  margin: 'left' | 'right';

  @Input()
  size: string;

  @Input()
  color: string;

  bem: Bem = buildBem('aui-icon');

  id = id++;

  constructor(private readonly iconRegistryService: IconRegisterService) {}

  private parseIcon(): [string, string] {
    const defaultPrefix = this.iconRegistryService.getDefaultIconPrefix();
    const arr = (this.icon || '').split(':');
    return arr.length < 2 ? [defaultPrefix, arr[0]] : [arr[0], arr[1]];
  }

  getWidth() {
    if (!this.size) {
      return false;
    }
    return (this.size || '').split(',')[0];
  }

  getHeight() {
    if (!this.size) {
      return false;
    }
    const arr = (this.size || '').split(',');
    return arr[1] || arr[0];
  }

  getIconId() {
    const [prefix, name] = this.parseIcon();
    return `${prefix}-${name}`;
  }

  getClass() {
    return `${this.bem.block(this.margin)} ${this.getIconId()}`;
  }
}
