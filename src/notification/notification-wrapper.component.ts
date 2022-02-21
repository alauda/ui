import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

import { MessageWrapperComponent } from '../message/message-wrapper.component';

@Component({
  selector: 'aui-notification-wrapper',
  styleUrls: ['./notification-wrapper.component.scss'],
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class NotificationWrapperComponent extends MessageWrapperComponent {
  constructor(public override elementRef: ElementRef) {
    super(elementRef);
  }
}
