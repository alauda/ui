import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import {
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  InjectionToken,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { isTemplateRef } from '../../utils';

import { DrawerRef, DrawerSize } from './drawer-ref';
import {
  DrawerContentDirective,
  DrawerFooterDirective,
  DrawerHeaderDirective,
} from './helper-directives';

export const DATA = new InjectionToken('drawer-data');

const DRAWER_OVERLAY_CLASS = 'aui-drawer-overlay';

const SIZE_MAPPER = {
  [DrawerSize.Small]: 400,
  [DrawerSize.Medium]: 600,
  [DrawerSize.Big]: 800,
};

@Component({
  selector: 'aui-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent<
    T = ComponentType<unknown>,
    R = unknown,
    D = unknown,
  >
  extends DrawerRef<T, R>
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input()
  title: string | TemplateRef<unknown>;

  @Input()
  footer: string | TemplateRef<unknown>;

  @Input()
  size: DrawerSize = DrawerSize.Medium;

  @Input()
  offsetY = '0px';

  @Input() visible: boolean;

  @Input()
  content: TemplateRef<T> | ComponentType<T>;

  @Input()
  hideOnClickOutside = false;

  @Input()
  showClose = true;

  @Input()
  drawerClass: string;

  @Input()
  mask: boolean;

  @Input()
  maskClosable: boolean;

  @Input()
  divider = true;

  private _value = SIZE_MAPPER[DrawerSize.Medium];
  @Input()
  set width(value: number) {
    this._value = value;
  }

  get width() {
    return this._value;
  }

  get drawerClasses(): Record<string, boolean> {
    return {
      'aui-drawer': true,
      hasDivider: this.divider,
      ...(this.drawerClass ? { [this.drawerClass]: true } : null),
    };
  }

  private readonly afterClosed$ = new Subject<R>();

  get afterClosed(): Observable<R> {
    return this.afterClosed$.asObservable();
  }

  private readonly afterOpen$ = new Subject<void>();

  get afterOpen(): Observable<void> {
    return this.afterOpen$.asObservable();
  }

  @Output()
  drawerViewInit = new EventEmitter<void>();

  @Output() readonly close = new EventEmitter<MouseEvent>();

  @ViewChild('drawerTemplate', { static: true })
  drawerTemplate: TemplateRef<void>;

  @ViewChild(CdkPortalOutlet, { static: false })
  bodyPortalOutlet: CdkPortalOutlet;

  @ContentChild(DrawerHeaderDirective, { read: TemplateRef })
  titleTemplate: TemplateRef<T>;

  @ContentChild(DrawerContentDirective, { read: TemplateRef })
  contentTemplate: TemplateRef<T> | ComponentType<T>;

  @ContentChild(DrawerFooterDirective, { read: TemplateRef })
  footerTemplate: TemplateRef<T>;

  onDestroy$ = new Subject<void>();

  isTemplateRef = isTemplateRef;

  componentInstance: T | null = null;

  contentParams: D;
  overlayRef: OverlayRef;
  portal: TemplatePortal;
  templateContext = {};
  get transform() {
    return `translateX(${this.visible ? 0 : '100%'})`;
  }

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly overlay: Overlay,
    private readonly injector: Injector,
    private readonly cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    this.attachOverlay();
    this.updateBodyOverflow();
    this.templateContext = { $implicit: this.contentParams };
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { visible } = changes;
    if (visible) {
      const value = visible.currentValue;
      if (value) {
        this.open();
      } else if (!visible.firstChange) {
        // 不希望默认关闭时，drawer 渲染后就触发 close 事件
        this.dispose();
      }
    }
  }

  ngAfterViewInit() {
    this.attachBodyContent();
    setTimeout(() => {
      this.drawerViewInit.emit();
    }, 0);
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
        .pipe(takeUntil(this.onDestroy$))
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
            this.dispose();
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

  private attachBodyContent(): void {
    this.bodyPortalOutlet?.dispose();
    const content = this.content || this.contentTemplate;
    if (content instanceof Type) {
      const componentPortal = new ComponentPortal<T>(
        content,
        null,
        Injector.create({
          providers: [
            {
              provide: DATA,
              useValue: this.contentParams,
            },
          ],
          parent: this.injector,
        }),
      );
      const componentRef =
        this.bodyPortalOutlet?.attachComponentPortal(componentPortal);
      this.componentInstance = componentRef.instance;
      Object.assign(componentRef.instance, this.contentParams);
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  private updateBodyOverflow(): void {
    if (this.overlayRef) {
      if (this.visible) {
        this.overlayRef.getConfig().scrollStrategy.enable();
      } else {
        this.overlayRef.getConfig().scrollStrategy.disable();
      }
    }
  }

  open() {
    this.visible = true;
    this.afterOpen$.next();
    this.afterOpen$.complete();
    this.updateBodyOverflow();
    this.cdr.markForCheck();
  }

  dispose(result: R = null) {
    this.visible = false;
    this.close.emit();
    this.afterClosed$.next(result);
    this.afterClosed$.complete();
    this.updateBodyOverflow();
    this.cdr.markForCheck();
  }

  private disposeOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.overlayRef = null;
  }

  maskClick() {
    if (this.maskClosable && this.mask) {
      this.dispose();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.disposeOverlay();
  }
}
