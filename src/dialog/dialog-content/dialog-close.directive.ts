import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Optional,
} from '@angular/core';

import { DialogRef } from '../dialog-ref';
import { DialogService } from '../dialog.service';
import { getClosestDialog } from '../utils';

@Directive({
  selector: 'button[auiDialogClose]',
  exportAs: 'auiDialogClose',
})
export class DialogCloseDirective implements OnInit {
  @Input('auiDialogClose')
  result: any;

  constructor(
    @Optional() public dialogRef: DialogRef<any>,
    private readonly elementRef: ElementRef,
    private readonly dialogService: DialogService,
  ) {}

  ngOnInit() {
    if (!this.dialogRef) {
      this.dialogRef = getClosestDialog(
        this.elementRef,
        this.dialogService.openDialogs,
      );
    }
  }

  @HostListener('click')
  closeDialog() {
    this.dialogRef.close(this.result);
  }
}
