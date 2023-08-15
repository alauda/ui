import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon';

import { NotificationWrapperComponent } from './notification-wrapper.component';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    IconModule,
    NotificationWrapperComponent,
    NotificationComponent,
  ],
  providers: [NotificationService],
})
export class NotificationModule {}
