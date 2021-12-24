import { Overlay } from '@angular/cdk/overlay';
import {
  ApplicationRef,
  ComponentFactoryResolver,
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

@Injectable()
export class NotificationService extends BaseMessage<
  NotificationWrapperComponent,
  NotificationComponent,
  NotificationConfig
> {
  constructor(
    overlay: Overlay,
    injector: Injector,
    applicationRef: ApplicationRef,
    cfr: ComponentFactoryResolver,
    @Optional()
    @Inject(NOTIFICATION_CONFIG)
    globalConfig: NotificationGlobalConfig,
  ) {
    super(
      overlay,
      injector,
      applicationRef,
      cfr,
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
