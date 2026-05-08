import { Overlay } from '@angular/cdk/overlay';
import {
  ApplicationRef,
  Inject,
  Injectable,
  Injector,
  Optional,
} from '@angular/core';

import { BaseMessage } from '../message/base-message';

import { NotificationWrapperComponent } from './notification-wrapper.component';
import { NotificationComponent } from './notification.component';
import {
  NOTIFICATION_CONFIG,
  NOTIFICATION_DEFAULT_CONFIG,
  NotificationConfig,
  NotificationGlobalConfig,
} from './notification.config';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseMessage<
  NotificationWrapperComponent,
  NotificationComponent,
  NotificationConfig
> {
  constructor(
    overlay: Overlay,
    injector: Injector,
    applicationRef: ApplicationRef,
    @Optional()
    @Inject(NOTIFICATION_CONFIG)
    globalConfig: NotificationGlobalConfig,
  ) {
    super(
      overlay,
      injector,
      applicationRef,
      'aui-notification-overlay-pane',
      NotificationWrapperComponent,
      NotificationComponent,
      {
        ...NOTIFICATION_DEFAULT_CONFIG,
        ...globalConfig,
      },
    );
  }
}
