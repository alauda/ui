import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/icon.module';

import { MessageWrapperComponent } from './message-wrapper.component';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [CommonModule, OverlayModule, IconModule],
  declarations: [MessageWrapperComponent, MessageComponent],
  entryComponents: [MessageWrapperComponent, MessageComponent],
})
export class MessageModule {}
