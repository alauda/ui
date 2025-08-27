import { ElementRef } from '@angular/core';

import { DialogRef } from '../dialog-ref';

export function getClosestDialog(
  element: ElementRef,
  openDialogs: Array<DialogRef<any>>,
) {
  let parent = (element.nativeElement as HTMLElement).parentElement;

  while (parent?.tagName !== 'AUI-DIALOG') {
    parent = parent.parentElement;
  }

  return parent
    ? openDialogs.find(dialog => dialog.id === parent.dataset.id)
    : null;
}

export * from './errors';
