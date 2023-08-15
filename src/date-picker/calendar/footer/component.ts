import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { ButtonComponent } from '../../../button/button.component';
import { I18nPipe } from '../../../i18n/i18n.pipe';

@Component({
  selector: 'aui-calendar-footer',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, ButtonComponent, I18nPipe],
})
export class CalendarFooterComponent {
  @Input()
  clearable = true;

  @Input()
  clearText: string;

  @Input()
  customAction: TemplateRef<any>;

  @Output()
  confirm = new EventEmitter<void>();

  @Output()
  clear = new EventEmitter<void>();
}
