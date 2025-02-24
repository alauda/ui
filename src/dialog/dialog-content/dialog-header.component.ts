import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';

import { IconComponent } from '../../icon/icon.component';
import { Bem, buildBem } from '../../internal/utils';
import { DialogRef } from '../dialog-ref';
import { DialogService } from '../dialog.service';
import { getClosestDialog } from '../utils';

@Component({
    selector: 'aui-dialog-header',
    templateUrl: './dialog-header.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    imports: [NgIf, IconComponent]
})
export class DialogHeaderComponent implements OnInit {
  bem: Bem = buildBem('aui-dialog');

  @Input()
  divider = true;

  @Input()
  closeable = true;

  @Input()
  result: any = false;

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
}
