import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  ScrollDispatcher,
} from '@angular/cdk/overlay';
import {
  ComponentPortal,
  ComponentType,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  Injectable,
  InjectionToken,
  Injector,
  NgZone,
  TemplateRef,
} from '@angular/core';

import { ConfirmDialogConfig } from './confirm-dialog/confirm-dialog-config';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { DialogComponent } from './dialog.component';
import { DialogSize } from './dialog.types';

export const DIALOG_DATA = new InjectionToken<any>('aui-dialog-data');

@Injectable()
export class DialogService {
  static readonly DIALOG_OVERLAY_PANE_CLASS = 'aui-dialog-overlay-pane';
  static readonly DIALOG_BACKDROP_CLASS = 'aui-dialog-backdrop';

  openDialogs: Array<DialogRef<any>> = [];

  constructor(
    private readonly overlay: Overlay,
    private readonly injector: Injector,
    private readonly scrollDispatcher: ScrollDispatcher,
    private readonly ngZone: NgZone,
  ) {}

  open<T, D = any, R = any>(
    compOrTempRef: ComponentType<T> | TemplateRef<T>,
    config: DialogConfig<D> = null,
  ): DialogRef<T, R> {
    this.hiddenPrevDialog();

    config = { ...new DialogConfig(), ...config };

    const overlayRef = this.createOverlay(config);
    const dialogIns = this.attachDialog(overlayRef, config);
    const dialogRef = this.attachDialogContent<T, D, R>(
      compOrTempRef,
      dialogIns,
      overlayRef,
      config,
    );
    this.openDialogs.push(dialogRef);
    dialogRef.updatePosition().updateSize();
    dialogRef.afterClosed().subscribe(() => {
      this.removeDialog(dialogRef);
      this.showPrevDialog();
    });

    return dialogRef;
  }

  confirm<T = unknown, R = unknown>(config: ConfirmDialogConfig): Promise<T> {
    const dialogRef = this.open<
      ConfirmDialogComponent,
      null,
      { confirm: boolean; result: T | R }
    >(ConfirmDialogComponent, {
      size: DialogSize.FitContent,
    });
    dialogRef.componentInstance.setConfig(config);

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(action => {
        if (action.confirm) {
          resolve(action.result as T);
        } else {
          reject(action.result as R);
        }
      });
    });
  }

  closeAll() {
    this.openDialogs.forEach(dialogRef => {
      dialogRef.close();
    });
  }

  private hiddenPrevDialog() {
    if (this.openDialogs.length > 0) {
      this.openDialogs[
        this.openDialogs.length - 1
      ].dialogInstance.hidden = true;
    }
  }

  private showPrevDialog() {
    if (this.openDialogs.length > 0) {
      this.openDialogs[
        this.openDialogs.length - 1
      ].dialogInstance.hidden = false;
    }
  }

  private createOverlay(config: DialogConfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(dialogConfig: DialogConfig): OverlayConfig {
    return {
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: dialogConfig.hasBackdrop && !this.openDialogs.length,
      backdropClass: DialogService.DIALOG_BACKDROP_CLASS,
      panelClass: DialogService.DIALOG_OVERLAY_PANE_CLASS,
      width: '100vw',
      height: '100vh',
    };
  }

  private attachDialog(
    overlayRef: OverlayRef,
    config: DialogConfig,
  ): DialogComponent {
    const dialogPortal = new ComponentPortal(
      DialogComponent,
      config.viewContainerRef,
    );
    const dialogRef = overlayRef.attach(dialogPortal);
    dialogRef.instance.config = config;
    return dialogRef.instance;
  }

  private attachDialogContent<T, D, R>(
    compOrTempRef: ComponentType<T> | TemplateRef<T>,
    dialogIns: DialogComponent,
    overlayRef: OverlayRef,
    config: DialogConfig<D>,
  ): DialogRef<T, R> {
    const dialogRef = new DialogRef<T, R>(
      overlayRef,
      dialogIns,
      this.scrollDispatcher,
      this.ngZone,
    );

    if (compOrTempRef instanceof TemplateRef) {
      dialogIns.attachTemplatePortal(
        new TemplatePortal(compOrTempRef, null, {
          $implicit: config.data,
        } as any),
      );
    } else {
      const injector = this.createInjector(config, dialogRef, dialogIns);
      const contentRef = dialogIns.attachComponentPortal<T>(
        new ComponentPortal(compOrTempRef, null, injector),
      );
      dialogRef.componentInstance = contentRef.instance;
    }
    return dialogRef;
  }

  private createInjector<T>(
    config: DialogConfig,
    dialogRef: DialogRef<T>,
    dialogIns: DialogComponent,
  ): Injector {
    const userInjector = config?.viewContainerRef?.injector;
    return Injector.create({
      providers: [
        {
          provide: DialogRef,
          useValue: dialogRef,
        },
        {
          provide: DIALOG_DATA,
          useValue: config.data || dialogIns,
        },
      ],
      parent: userInjector || this.injector,
    });
  }

  private removeDialog(dialogRef: DialogRef<any>) {
    const index = this.openDialogs.indexOf(dialogRef);
    this.openDialogs.splice(index, 1);
  }
}
