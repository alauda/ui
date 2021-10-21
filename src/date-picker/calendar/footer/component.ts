import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'aui-calendar-footer',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
