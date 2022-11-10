import { ViewContainerRef } from '@angular/core';

import { DialogSize } from './dialog.types';

export class BaseDialogConfig {
  noAnimation? = false;
}

export class DialogConfig<D = any> extends BaseDialogConfig {
  id?: number;
  viewContainerRef?: ViewContainerRef;
  data?: D;
  size?: DialogSize = DialogSize.Big;
  hasBackdrop? = true;
  fitViewport? = false;
}
