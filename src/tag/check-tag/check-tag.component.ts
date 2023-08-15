import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { ComponentSize } from '../../types';
import { Bem, buildBem } from '../../utils';
import { TagType } from '../tag.types';

@Component({
  selector: 'aui-check-tag',
  templateUrl: './check-tag.component.html',
  styleUrls: ['./check-tag.component.scss', '../tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  standalone: true,
})
export class CheckTagComponent {
  bem: Bem = buildBem('aui-tag');
  hovered = false;

  @Input()
  checked = false;

  @Input()
  size: ComponentSize = ComponentSize.Medium;

  @Input()
  round = true;

  @Output()
  checkedChange = new EventEmitter<boolean>();

  get rootClass() {
    return `aui-check-tag ${this.bem.block(
      this.size,
      this.checked || this.hovered ? TagType.Primary : TagType.Info,
    )} ${this.round ? 'isRound' : ''}`;
  }
}
