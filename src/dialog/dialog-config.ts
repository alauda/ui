import { ViewContainerRef } from '@angular/core';

import { DialogSize } from './dialog.types';

export class DialogConfig<D = any> {
  id?: number;
  viewContainerRef?: ViewContainerRef;
  data?: D;
  size?: DialogSize = DialogSize.Medium;
  hasBackdrop? = true;
  fitViewport? = false;
  className?: string;
  offsetTop?: string;
}
