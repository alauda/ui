import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { ComponentSize } from '../../types';
import { Bem, buildBem } from '../../utils';

@Component({
  selector: 'aui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  standalone: true,
})
export class MenuComponent {
  bem: Bem = buildBem('aui-menu');

  @Input()
  size: ComponentSize = ComponentSize.Small;
}
