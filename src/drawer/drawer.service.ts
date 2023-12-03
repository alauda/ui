import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { debounceTime, filter, fromEvent, Subject, takeUntil } from 'rxjs';

import { DrawerInternalComponent } from './component/internal/internal.component';
import { DrawerRef } from './drawer-ref';
import { DrawerOptions } from './types';

const DRAWER_OVERLAY_CLASS = 'aui-drawer-overlay';
const DRAWER_OVERLAY_BACKDROP_CLASS = 'aui-drawer-mask';

@Injectable()
export class DrawerService {
  private overlayRef: OverlayRef;
  options: DrawerOptions;
  onDestroy$ = new Subject<void>();
  drawerCpt: ComponentRef<DrawerInternalComponent>;

  constructor(private readonly overlay: Overlay) {}

  open(options: DrawerOptions) {
    this.disposeOverlay();
    this.updateOptions(options);
    this.createOverlay();
    return this.createDrawer();
  }

  close() {
    this.drawerCpt?.instance?.hide();
  }

  updateOptions(options: DrawerOptions): void {
    this.options = options;
  }

  private createOverlay() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.backdropClick().subscribe(() => {
      if (this.options.maskClosable) {
        this.close();
      }
    });
    this.overlayRef
      .outsidePointerEvents()
      .pipe(takeUntil(this.onDestroy$))
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
          this.close();
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
          takeUntil(this.onDestroy$),
        )
        .subscribe(() => {
          this.overlayRef.getConfig().scrollStrategy.enable();
        });
    }
  }

  private createDrawer(): DrawerRef {
    this.drawerCpt = this.overlayRef.attach(
      new ComponentPortal(DrawerInternalComponent),
    );
    this.drawerCpt.instance.options = this.options;
    this.drawerCpt.instance.animationStep$.subscribe(step => {
      const backdropElement = this.overlayRef.backdropElement;
      if (backdropElement) {
        const enters = [
          `${DRAWER_OVERLAY_BACKDROP_CLASS}-enter`,
          `${DRAWER_OVERLAY_BACKDROP_CLASS}-enter-active`,
        ];
        const leaves = [
          `${DRAWER_OVERLAY_BACKDROP_CLASS}-leave`,
          `${DRAWER_OVERLAY_BACKDROP_CLASS}-leave-active`,
        ];
        if (step === 'showStart') {
          backdropElement.classList.add(...enters);
        }
        if (step === 'hideStart') {
          backdropElement.classList.add(...leaves);
        }
        if (['showDone', 'hideDone'].includes(step)) {
          backdropElement.classList.remove(...enters, ...leaves);
        }
      }
      if (step === 'hideDone') {
        this.disposeOverlay();
      }
    });

    const drawerRef = new DrawerRef(this.drawerCpt.instance);

    this.drawerCpt.instance.show();

    return drawerRef;
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      panelClass: DRAWER_OVERLAY_CLASS,
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.options.mask
        ? this.overlay.scrollStrategies.block()
        : this.overlay.scrollStrategies.noop(),
      hasBackdrop: this.options.mask,
      backdropClass: DRAWER_OVERLAY_BACKDROP_CLASS,
    });
  }

  private disposeOverlay(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    if (this.overlayRef) {
      this.overlayRef.getConfig().scrollStrategy.disable();
      this.overlayRef.dispose();
    }
    this.overlayRef = null;
  }

  ngOnDestroy(): void {
    this.disposeOverlay();
  }
}
