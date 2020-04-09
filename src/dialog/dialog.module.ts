import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/public-api';
import { IconModule } from '../icon/public-api';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogCloseDirective } from './dialog-content/dialog-close.directive';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { DialogFooterComponent } from './dialog-content/dialog-footer.component';
import { DialogHeaderComponent } from './dialog-content/dialog-header.component';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    IconModule,
    ButtonModule,
  ],
  declarations: [
    DialogComponent,
    DialogHeaderComponent,
    DialogContentComponent,
    DialogFooterComponent,
    DialogCloseDirective,
    ConfirmDialogComponent,
  ],
  exports: [
    DialogComponent,
    DialogHeaderComponent,
    DialogContentComponent,
    DialogFooterComponent,
    DialogCloseDirective,
  ],
  entryComponents: [DialogComponent, ConfirmDialogComponent],
  providers: [DialogService],
})
export class DialogModule {}
