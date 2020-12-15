import { ConfirmType } from '../dialog.types';

export class ConfirmDialogConfig<T = unknown, R = unknown> {
  title: string;
  content?: string;
  confirmButton? = true;
  cancelButton? = true;
  confirmType?: ConfirmType = ConfirmType.Primary;
  confirmText? = 'OK';
  cancelText? = 'Cancel';

  beforeConfirm?: (resolve: (result?: T) => void, reject: () => void) => void;
  beforeCancel?: (resolve: (result?: R) => void, reject: () => void) => void;
}
