
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';
import { Bem, buildBem } from '../internal/utils';

import { InlineAlertTitleDirective } from './helper-directives';
import { InlineAlertType } from './inline-alert.types';

@Component({
  selector: 'aui-inline-alert',
  templateUrl: './inline-alert.component.html',
  styleUrls: ['./inline-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  imports: [IconComponent],
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

  @ContentChild(InlineAlertTitleDirective)
  titleRef: InlineAlertTitleDirective;

  visible = true;

  iconMap(type: InlineAlertType) {
    switch (type) {
      case InlineAlertType.Success: {
        return 'check_circle_s';
      }
      case InlineAlertType.Warning: {
        return 'exclamation_circle_s';
      }
      case InlineAlertType.Danger:
      case InlineAlertType.Error: {
        return 'exclamation_triangle_s';
      }
      default: {
        return 'info_circle_s';
      }
    }
  }

  closeSelf() {
    this.visible = false;
    this.close.emit();
  }
}
