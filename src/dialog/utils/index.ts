import { ElementRef } from '@angular/core';

import { DialogRef } from '../dialog-ref';

export function getClosestDialog(
  element: ElementRef,
  openDialogs: Array<DialogRef<any>>,
) {
  let parent: HTMLElement | null = element.nativeElement.parentElement;

  while (parent?.tagName !== 'AUI-DIALOG') {
    parent = parent.parentElement;
  }

  return parent
    ? openDialogs.find(dialog => dialog.id === parent.dataset.id)
    : null;
}
