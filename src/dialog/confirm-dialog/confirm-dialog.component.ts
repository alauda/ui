import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

import { Bem, buildBem, isString, isTemplateRef } from '../../utils';
import { DialogRef } from '../dialog-ref';
import {
  BeforeAction,
  ConfirmType,
  CustomBeforeAction,
  PromiseExecutor,
} from '../dialog.types';

import { ConfirmDialogConfig } from './confirm-dialog-config';

@Component({
  selector: 'aui-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class ConfirmDialogComponent<T = unknown, R = unknown> {
  bem: Bem = buildBem('aui-confirm-dialog');

  config: ConfirmDialogConfig<T, R>;

  waitConfirm = false;
  waitCancel = false;
  isTemplateRef = isTemplateRef;
  isString = isString;
  constructor(
    private readonly dialogRef: DialogRef<any>,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  setConfig(config: ConfirmDialogConfig<T, R>) {
    this.config = { ...new ConfirmDialogConfig(), ...config };
  }

  iconMap(type: ConfirmType) {
    switch (type) {
      case ConfirmType.Success: {
        return 'check_circle_s';
      }
      case ConfirmType.Danger: {
        return 'exclamation_triangle_s';
      }
      default: {
        return 'exclamation_circle_s';
      }
    }
  }

  async confirm() {
    if (!this.config.beforeConfirm) {
      this.dialogRef.close({ confirm: true, result: null });
      return;
    }
    this.waitConfirm = true;
    try {
      const result = await this.toPromise(this.config.beforeConfirm);
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
      return;
    }
    this.waitCancel = true;
    try {
      const result = await this.toPromise(this.config.beforeCancel);
      this.dialogRef.close({ confirm: false, result });
    } catch {
    } finally {
      this.waitCancel = false;
      this.cdr.markForCheck();
    }
  }

  private toPromise<T>(beforeAction: BeforeAction<T>) {
    if (beforeAction.length) {
      return new Promise(beforeAction as PromiseExecutor<T>);
    }

    const result = (beforeAction as CustomBeforeAction<T>)();

    if (result instanceof Observable) {
      return firstValueFrom(result);
    }

    return result;
  }
}
