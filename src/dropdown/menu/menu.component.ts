import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { ComponentSize } from '../../types';
import { Bem, buildBem } from '../../utils';

import { MenuContentDirective } from './menu-content.directive';

@Component({
  selector: 'aui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class MenuComponent {
  bem: Bem = buildBem('aui-menu');

  @Input()
  size: ComponentSize = ComponentSize.Small;

  @ViewChild(TemplateRef, { static: true })
  template: TemplateRef<any>;

  @ContentChild(MenuContentDirective, { static: true })
  lazyContent: MenuContentDirective;
}
