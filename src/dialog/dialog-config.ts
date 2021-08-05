import { ViewContainerRef } from '@angular/core';

import { DialogSize } from './dialog.types';

export class DialogConfig<D = any> {
  id?: number;
  viewContainerRef?: ViewContainerRef;
  data?: D;
  size?: DialogSize = DialogSize.Big;
  hasBackdrop? = true;
  fitViewport? = false;
}
