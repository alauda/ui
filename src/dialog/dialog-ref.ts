import {
  CdkScrollable,
  ComponentType,
  GlobalPositionStrategy,
  OverlayRef,
  ScrollDispatcher,
} from '@angular/cdk/overlay';
import { NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { DialogComponent } from './dialog.component';

let uniqueId = 0;

export class DialogRef<T = ComponentType<any>, R = any> {
  componentInstance?: T;
  readonly id = `aui-dialog-${uniqueId++}`;

  private readonly afterOpen$ = new Subject<void>();
  private readonly afterClosed$ = new Subject<R>();

  private readonly scrollable: CdkScrollable;

  constructor(
    private readonly overlayRef: OverlayRef,
    public dialogInstance: DialogComponent,
    scrollDispatcher: ScrollDispatcher,
    ngZone: NgZone,
  ) {
    dialogInstance.id = this.id;
    this.scrollable = new CdkScrollable(
      { nativeElement: overlayRef.overlayElement },
      scrollDispatcher,
      ngZone,
    );
    this.scrollable.ngOnInit();
  }

  close(result: R = null): void {
    this.scrollable.ngOnDestroy();
    this.overlayRef.detachBackdrop();
    this.overlayRef.dispose();
    this.afterClosed$.next(result);
    this.afterClosed$.complete();
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
