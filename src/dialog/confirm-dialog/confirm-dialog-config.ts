import { TemplateRef, Type } from '@angular/core';

import { BaseDialogConfig } from '../dialog-config';
import { BeforeAction, ConfirmType } from '../dialog.types';

export class ConfirmDialogConfig<
  T = unknown,
  R = unknown,
> extends BaseDialogConfig {
  title: string;
  content?: string | TemplateRef<any> | Type<any>;
  cancelButton? = true;
  confirmType?: ConfirmType = ConfirmType.Primary;
  confirmText? = 'OK';
  cancelText? = 'Cancel';

  beforeConfirm?: BeforeAction<T>;
  beforeCancel?: BeforeAction<R>;
}
