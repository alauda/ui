import { NgStyle, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';
import { ComponentSize } from '../internal/types';
import { Bem, buildBem } from '../internal/utils';

import { TagType } from './tag.types';

@Component({
  selector: 'aui-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  standalone: true,
  imports: [NgStyle, NgIf, IconComponent],
})
export class TagComponent {
  bem: Bem = buildBem('aui-tag');

  @Input()
  type: TagType = TagType.Primary;

  @Input()
  size: ComponentSize = ComponentSize.Medium;

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

  @Input()
  allowClick = false;

  @Output()
  close = new EventEmitter<void>();

  get rootClass() {
    return `${this.bem.block(
      this.type || TagType.Primary,
      this.size || ComponentSize.Medium,
    )} ${this.solid ? 'isSolid' : ''} ${this.border ? 'hasBorder' : ''} ${
      this.invalid ? 'isInvalid' : ''
    } ${this.round ? 'isRound' : ''} ${
      this.allowClick && this.isNormalTag ? 'allowClick' : ''
    }`;
  }

  // 只有常规标签支持单击样式
  get isNormalTag() {
    return !this.solid && !this.closeable && !this.invalid;
  }

  get customStyle() {
    const arr = this.color.split(',');
    const main = arr[0].trim();
    const secondary = (arr[1] || arr[0]).trim();
    return {
      color: main,
      'border-color': this.solid ? secondary : main,
      'background-color': secondary,
    };
  }
}
