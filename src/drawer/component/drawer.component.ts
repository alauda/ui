import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DrawerSize } from '../drawer.types';

import {
  DrawerFooterDirective,
  DrawerHeaderDirective,
} from './helper-directives';

export const DATA = new InjectionToken('drawer-data');

const DRAWER_OVERLAY_CLASS = 'aui-drawer-overlay';

@Component({
  selector: 'aui-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class DrawerComponent<T = ComponentType<unknown>, D = unknown>
  implements OnInit, OnDestroy {
  @Input()
  size: DrawerSize = DrawerSize.Medium;

  @Input()
  offsetY = '0px';

  @Input() visible: boolean;

  @Input()
  hideOnClickOutside = false;

  @Input()
  showClose = true;

  @Input()
  drawerClass: string;

  @Input()
  divider = true;

  @Input()
  mask: boolean;

  @Input()
  maskClosable: boolean;

  @Input()
  width: string = DrawerSize.Medium;

  get drawerClasses(): Record<string, boolean> {
    return {
      'aui-drawer': true,
      hasDivider: this.divider,
      isOpen: this.visible,
      ...(this.drawerClass ? { [this.drawerClass]: true } : null),
    };
  }

  @Output() readonly visibleChange = new EventEmitter<boolean>();

  @ViewChild('drawerTemplate', { static: true })
  drawerTemplate: TemplateRef<void>;

  @ViewChild(CdkPortalOutlet, { static: false })
  bodyPortalOutlet: CdkPortalOutlet;

  @ContentChild(DrawerHeaderDirective, { read: TemplateRef })
  headerRef: TemplateRef<T>;

  @ContentChild(DrawerFooterDirective, { read: TemplateRef })
  footerRef: TemplateRef<T>;

  destroy$ = new Subject<void>();

  contentParams: D;
  overlayRef: OverlayRef;
  portal: TemplatePortal;
  templateContext: unknown = {};

  get transform() {
    return `translateX(${this.visible ? 0 : '100%'})`;
  }

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly overlay: Overlay,
  ) {}

  ngOnInit() {
    this.attachOverlay();
    this.updateBodyOverflow();
    this.templateContext = { $implicit: this.contentParams };
  }

  open() {
    this.visibleChange.emit(true);
    this.updateBodyOverflow();
  }

  close() {
    this.visibleChange.emit(false);
    this.updateBodyOverflow();
  }

  maskClick() {
    if (this.maskClosable && this.mask) {
      this.close();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.disposeOverlay();
  }

  private attachOverlay() {
    if (!this.overlayRef) {
      this.portal = new TemplatePortal(
        this.drawerTemplate,
        this.viewContainerRef,
      );
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
    }
    if (this.overlayRef) {
      this.overlayRef.attach(this.portal);
      this.overlayRef
        .outsidePointerEvents()
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          // 判断鼠标点击事件的 target 是否为 overlay-container 的子节点，如果是，则不关闭 drawer。
          // 为了避免点击 drawer 里的 tooltip 后 drawer 被关闭。
          if (
            this.visible &&
            this.hideOnClickOutside &&
            event.target instanceof Node &&
            !this.overlayRef.hostElement?.parentNode?.contains(event.target)
          ) {
            event.stopPropagation();
            event.preventDefault();
            this.close();
          }
        });
    }
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      panelClass: DRAWER_OVERLAY_CLASS,
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
  }

  private updateBodyOverflow() {
    if (this.overlayRef) {
      if (this.visible) {
        this.overlayRef.getConfig().scrollStrategy.enable();
      } else {
        this.overlayRef.getConfig().scrollStrategy.disable();
      }
    }
  }

  private disposeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.overlayRef = null;
  }
}
