import { Overlay } from '@angular/cdk/overlay';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  Optional,
} from '@angular/core';

import { BaseMessage } from './base-message';
import { MessageWrapperComponent } from './message-wrapper.component';
import { MessageComponent } from './message.component';
import {
  MESSAGE_CONFIG,
  MESSAGE_DEFAULT_CONFIG,
  MessageConfig,
  MessageGlobalConfig,
} from './message.config';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends BaseMessage<
  MessageWrapperComponent,
  MessageComponent,
  MessageConfig
> {
  constructor(
    overlay: Overlay,
    injector: Injector,
    applicationRef: ApplicationRef,
    cfr: ComponentFactoryResolver,
    @Optional()
    @Inject(MESSAGE_CONFIG)
    globalConfig: MessageGlobalConfig,
  ) {
    super(
      overlay,
      injector,
      applicationRef,
      cfr,
      'aui-message-overlay-pane',
      MessageWrapperComponent,
      MessageComponent,
      {
        ...MESSAGE_DEFAULT_CONFIG,
        ...globalConfig,
      },
    );
  }
}
