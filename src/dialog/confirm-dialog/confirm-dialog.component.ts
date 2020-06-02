import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem } from '../../utils/bem';
import { DialogRef } from '../dialog-ref';
import { ConfirmType } from '../dialog.types';

import { ConfirmDialogConfig } from './confirm-dialog-config';

@Component({
  selector: 'aui-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class ConfirmDialogComponent {
  bem: Bem = buildBem('aui-confirm-dialog');

  config: ConfirmDialogConfig;

  waitConfirm = false;
  waitCancel = false;

  constructor(
    private readonly dialogRef: DialogRef<any>,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  setConfig(config: ConfirmDialogConfig) {
    this.config = { ...new ConfirmDialogConfig(), ...config };
  }

  iconMap(type: ConfirmType) {
    switch (type) {
      case ConfirmType.Success:
        return 'check_circle_s';
      case ConfirmType.Danger:
        return 'exclamation_triangle_s';
      case ConfirmType.Primary:
      case ConfirmType.Warning:
      default:
        return 'exclamation_circle_s';
    }
  }

  async confirm() {
    if (!this.config.beforeConfirm) {
      this.dialogRef.close({ confirm: true, result: null });
      return;
    }
    this.waitConfirm = true;
    try {
      const result = await new Promise(this.config.beforeConfirm);
      this.dialogRef.close({ confirm: true, result });
    } catch {
    } finally {
      this.waitConfirm = false;
      this.cdr.markForCheck();
    }
  }

  async cancel() {
    if (!this.config.beforeCancel) {
      this.dialogRef.close({ confirm: false, result: null });
    }
    this.waitCancel = true;
    try {
      const result = await new Promise(this.config.beforeCancel);
      this.dialogRef.close({ confirm: false, result });
    } catch {
    } finally {
      this.waitCancel = false;
      this.cdr.markForCheck();
    }
  }
}
