import {
  ComponentType,
  GlobalPositionStrategy,
  OverlayRef,
} from '@angular/cdk/overlay';
import { filter, Observable, Subject, take } from 'rxjs';

import { DialogComponent } from './dialog.component';

let uniqueId = 0;

export class DialogRef<T = ComponentType<any>, R = any> {
  componentInstance?: T;
  readonly id = `aui-dialog-${uniqueId++}`;

  private readonly afterOpen$ = new Subject<void>();
  private readonly afterClosed$ = new Subject<R>();

  constructor(
    private readonly overlayRef: OverlayRef,
    public dialogInstance: DialogComponent,
  ) {
    dialogInstance.id = this.id;
  }

  close(result: R = null): void {
    this.dialogInstance.animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'done' && event.toState === 'exit'),
        take(1),
      )
      .subscribe(() => {
        this.overlayRef.detachBackdrop();
        this.overlayRef.dispose();
        this.afterClosed$.next(result);
        this.afterClosed$.complete();
      });
    this.dialogInstance.startExitAnimation();
  }

  afterOpen(): Observable<void> {
    return this.afterOpen$.asObservable();
  }

  afterClosed(): Observable<R> {
    return this.afterClosed$.asObservable();
  }

  updatePosition(): this {
    this.getPositionStrategy().top('0').left('0');
    this.overlayRef.updatePosition();
    return this;
  }

  updateSize(): this {
    this.getPositionStrategy();
    this.overlayRef.updatePosition();
    return this;
  }

  private getPositionStrategy(): GlobalPositionStrategy {
    return this.overlayRef.getConfig()
      .positionStrategy as GlobalPositionStrategy;
  }
}
