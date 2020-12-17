import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { ComponentSize } from '../types';
import { Bem, buildBem } from '../utils/bem';

import { TagType } from './tag.types';

@Component({
  selector: 'aui-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class TagComponent {
  bem: Bem = buildBem('aui-tag');

  @Input()
  type = TagType.Primary;

  @Input()
  size = ComponentSize.Medium;

  @Input()
  closeable = false;

  @Input()
  border = false;

  @Input()
  solid = false;

  @Input()
  invalid = false;

  @Input()
  round = true;

  @Input()
  color = '';

  @Output()
  close = new EventEmitter<void>();

  get rootClass() {
    return `${this.bem.block(
      this.type || TagType.Primary,
      this.size || ComponentSize.Medium,
    )} ${this.solid ? 'isSolid' : ''} ${this.border ? 'hasBorder' : ''} ${
      this.invalid ? 'isInvalid' : ''
    } ${this.round ? 'isRound' : ''}`;
  }

  get customStyle() {
    const arr = this.color.split(',');
    return {
      color: arr[0],
      'border-color': arr[0],
      'background-color': arr[1] || arr[0],
    };
  }
}
