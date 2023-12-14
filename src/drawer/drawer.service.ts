import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { debounceTime, filter, fromEvent, Subject, takeUntil } from 'rxjs';

import { DrawerInternalComponent } from './component/internal/internal.component';
import { DrawerRef } from './drawer-ref';
import { DrawerOptions, DrawerSize } from './types';

const DRAWER_OVERLAY_CLASS = 'aui-drawer-overlay';
const defaultOptions: DrawerOptions = {
  size: DrawerSize.Medium,
  offsetY: '0px',
  showClose: true,
  hideOnClickOutside: true,
  divider: true,
};

@Injectable()
export class DrawerService<
  T = unknown,
  C extends object = object,
  R = unknown,
> {
  private overlayRef: OverlayRef;
  options: DrawerOptions<T, C>;
  drawerRef: DrawerRef<T, C, R>;
  invisible$ = new Subject<void>();
  private drawerInternalComponentRef: ComponentRef<
    DrawerInternalComponent<T, C>
  >;

  constructor(private readonly overlay: Overlay) {}

  open(options: DrawerOptions<T, C>) {
    this.updateOptions(options);
    this.createOverlay();
    this.createDrawer();
    this.drawerRef = new DrawerRef<T, C, R>(
      this.drawerInternalComponentRef.instance,
    );
    this.drawerRef.open();

    return this.drawerRef;
  }

  updateOptions(options: DrawerOptions<T, C>): void {
    this.options = {
      ...(defaultOptions as DrawerOptions<T, C>),
      ...options,
    };
  }

  private createOverlay() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
    }

    this.overlayRef
      .outsidePointerEvents()
      .pipe(takeUntil(this.invisible$))
      .subscribe(event => {
        // 判断鼠标点击事件的 target 是否为 overlay-container 的子节点，如果是，则不关闭 drawer。
        // 为了避免点击 drawer 里的 tooltip 后 drawer 被关闭。
        if (
          this.overlayRef &&
          this.options.hideOnClickOutside &&
          event.target instanceof Node &&
          !this.overlayRef.hostElement?.parentNode?.contains(event.target)
        ) {
          event.stopPropagation();
          event.preventDefault();
          this.drawerRef.close();
        }
      });

    this.overlayRef.getConfig().scrollStrategy.enable();
    if (this.options.mask) {
      // Issues: https://github.com/angular/components/issues/10841
      // scrollStrategy 为 Block 时，若创建 Overlay 时，高度不足以出现滚动，则 scrollStrategy 不会生效
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(100),
          filter(
            () => document.documentElement.scrollHeight > window.innerHeight,
          ),
          takeUntil(this.invisible$),
        )
        .subscribe(() => {
          this.overlayRef.getConfig().scrollStrategy.enable();
        });
    }
  }

  private createDrawer() {
    if (this.drawerInternalComponentRef) {
      return;
    }
    const drawerInternalComponentRef = this.overlayRef.attach(
      new ComponentPortal(DrawerInternalComponent<T, C>),
    );
    drawerInternalComponentRef.instance.options = this.options;
    drawerInternalComponentRef.instance.animationStep$.subscribe(step => {
      if (step === 'hideDone') {
        this.invisible$.next();
        this.overlayRef?.getConfig().scrollStrategy.disable();
      }
    });
    this.drawerInternalComponentRef = drawerInternalComponentRef;
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      panelClass: DRAWER_OVERLAY_CLASS,
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.options.mask
        ? this.overlay.scrollStrategies.block()
        : this.overlay.scrollStrategies.noop(),
    });
  }

  ngOnDestroy(): void {
    this.invisible$.next();
    if (this.overlayRef) {
      this.overlayRef.getConfig().scrollStrategy.disable();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
