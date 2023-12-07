import { filter, Observable, Subject } from 'rxjs';

import { DrawerInternalComponent } from './component/internal/internal.component';

export class DrawerRef<T = unknown, C extends object = object, R = unknown> {
  private result: R;

  private readonly afterOpen$ = new Subject<void>();
  private readonly afterClosed$ = new Subject<R>();

  get afterOpen(): Observable<void> {
    return this.afterOpen$.asObservable();
  }

  get afterClosed(): Observable<R> {
    return this.afterClosed$.asObservable();
  }

  constructor(public drawerInstance: DrawerInternalComponent<T, C>) {
    this.drawerInstance.animationStep$
      .pipe(filter(step => step === 'hideDone'))
      .subscribe(() => {
        this.afterClosed$.next(this.result);
        this.afterClosed$.complete();
      });
  }

  open() {
    this.drawerInstance.show();
  }

  close(result?: R): void {
    this.result = result;
    this.drawerInstance.hide();
  }
}
