import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem } from '../utils';

import { InlineAlertTitleDirective } from './helper-directives';
import { iconMap } from './icon-map';
import { InlineAlertType } from './inline-alert.types';

@Component({
  selector: 'aui-inline-alert',
  templateUrl: './inline-alert.component.html',
  styleUrls: ['./inline-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class InlineAlertComponent {
  bem: Bem = buildBem('aui-inline-alert');

  @Input()
  title: string;

  @Input()
  content: string;

  @Input()
  closable = false;

  @Input()
  type: InlineAlertType = InlineAlertType.Info;

  @Output()
  close = new EventEmitter<void>();

  @ContentChild(InlineAlertTitleDirective, { static: true })
  titleRef: InlineAlertTitleDirective;

  visible = true;

  get iconKey() {
    return iconMap[this.type || InlineAlertType.Info];
  }

  closeSelf() {
    this.visible = false;
    this.close.emit();
  }
}
