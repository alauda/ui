import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem, handlePixel } from '../utils';

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
  icon: string;

  @Input()
  light: string;

  @Input()
  dark: string;

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

  constructor(private readonly iconRegisterService: IconRegisterService) {}

  private parseIcon(icon: string): [string, string] {
    const defaultPrefix = this.iconRegisterService.getDefaultIconPrefix();
    const arr = (icon || '').split(':');
    return arr.length < 2 ? [defaultPrefix, arr[0]] : [arr[0], arr[1]];
  }

  getWidth() {
    if (!this.size) {
      return false;
    }
    return handlePixel((this.size || '').split(',')[0]);
  }

  getHeight() {
    if (!this.size) {
      return false;
    }
    const arr = (this.size || '').split(',');
    return handlePixel(arr[1] || arr[0]);
  }

  getIconId(icon: string) {
    const [prefix, name] = this.parseIcon(icon);
    return `${prefix}-${name}`;
  }

  getClass(id: string) {
    return `${this.bem.block(this.margin)} ${id}`;
  }
}
