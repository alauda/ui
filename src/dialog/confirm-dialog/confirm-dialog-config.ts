import { TemplateRef } from '@angular/core';

import { BeforeAction, ConfirmType } from '../dialog.types';

export class ConfirmDialogConfig<T = unknown, R = unknown> {
  title: string;
  content?: string | TemplateRef<any>;
  cancelButton? = true;
  confirmType?: ConfirmType = ConfirmType.Primary;
  confirmText? = 'OK';
  cancelText? = 'Cancel';

  beforeConfirm?: BeforeAction<T>;
  beforeCancel?: BeforeAction<R>;
}
