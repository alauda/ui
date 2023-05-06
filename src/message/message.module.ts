import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/icon.module';

import { MessageWrapperComponent } from './message-wrapper.component';
import { MessageComponent } from './message.component';
import { MessageService } from './message.service';

@NgModule({
  imports: [CommonModule, OverlayModule, IconModule],
  declarations: [MessageWrapperComponent, MessageComponent],
  providers: [MessageService],
})
export class MessageModule {}
