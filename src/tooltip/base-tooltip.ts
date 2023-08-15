import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  ReplaySubject,
  merge,
  debounceTime,
  takeUntil,
  first,
  filter,
  Subject,
  delay,
} from 'rxjs';

import { sleep } from '../utils';

import { TooltipComponent } from './tooltip.component';
import { TooltipTrigger, TooltipType } from './tooltip.types';
import { getOriginPosition, getOverlayPosition } from './utils';

export interface TooltipInterface {
  content: string | TemplateRef<any>;
  context: any;
  class: string;
  type: TooltipType;
  position: string;
  trigger: TooltipTrigger;
  disabled: boolean;
  hideOnClick: boolean;
  visibleChange: EventEmitter<boolean>;
}

export const DISPLAY_DELAY = 50;
export const HIDDEN_DELAY = 150;

// @ts-ignore
interface HackOverlayRef extends OverlayRef {
  _positionStrategy: {
    _hasExactPosition: () => boolean;
    _pane: HTMLElement;
    _lastPosition: ConnectedPosition | null;
    _boundingBox: HTMLElement;
    _transformOriginSelector: string;
  };
}

@Directive()
export class BaseTooltip<T = any>
  implements TooltipInterface, AfterViewInit, OnDestroy
{
  set content(value: string | TemplateRef<any>) {
    this._content = value;
    this.inputContent$$.next(value);
  }

  get content() {
    return this._content;
  }

  set context(value: T) {
    this._context = value;
    this.inputContext$$.next(value);
  }

  get context() {
    return this._context;
  }

  set class(value: string) {
    this.inputClass$$.next(value);
  }

  set type(value: TooltipType) {
    if (!value) {
      return;
    }
    this.inputType$$.next(value);
  }

  set position(value: string) {
    if (!value || value === this._position) {
      return;
    }
    this._position = value;
    this.inputPosition$$.next(value);
    this._disposeTooltip();
  }

  get position() {
    return this._position;
  }

  set trigger(value) {
    if (!value || value === this._trigger) {
      return;
    }
    this._trigger = value;
    this._disposeTooltip();
    this.ngZone.run(this.updateListeners, this);
  }

  get trigger() {
    return this._trigger;
  }

  set disabled(value) {
    this._disabled = value;
    if (value) {
      this._disposeTooltip();
    }
  }

  get disabled() {
    return this._disabled;
  }

  hideOnClick = false;
  disableAnimation = true;

  visibleChange = new EventEmitter<boolean>();

  overlayRef: OverlayRef;
  protected componentClass: ComponentType<any> = TooltipComponent;
  protected componentIns: TooltipComponent;
  protected hostHovered = false;
  protected tooltipHovered = false;
  protected listeners: Array<() => void> = [];
  protected unlistenBody: () => void;

  protected inputContent$$ = new ReplaySubject<string | TemplateRef<any>>(1);
  protected inputType$$ = new ReplaySubject<TooltipType>(1);
  protected inputPosition$$ = new ReplaySubject<string>(1);
  protected inputClass$$ = new ReplaySubject<string>(1);
  protected inputContext$$ = new ReplaySubject<any>(1);

  protected tooltipChanged$ = merge(
    this.inputContent$$,
    this.inputType$$,
    this.inputPosition$$,
    this.inputClass$$,
    this.inputContext$$,
  );

  protected destroy$ = new Subject();

  protected _position = 'top';
  protected _trigger = TooltipTrigger.Hover;
  protected _disabled = false;
  protected _context: T;
  protected _content: string | TemplateRef<unknown>;

  get isCreated() {
    return !!this.overlayRef;
  }

  constructor(
    protected overlay: Overlay,
    protected viewContainerRef: ViewContainerRef,
    protected elRef: ElementRef<HTMLInputElement>,
    protected renderer: Renderer2,
    protected cdr: ChangeDetectorRef,
    protected ngZone: NgZone,
  ) {
    this.tooltipChanged$.pipe(debounceTime(0)).subscribe(() => {
      this.updatePosition();
    });
  }

  private _updateTransformOrigin() {
    // @ts-ignore
    const overlayRef = this.overlayRef as HackOverlayRef;
    const positionStrategy = overlayRef._positionStrategy;
    const hasExactPosition = positionStrategy._hasExactPosition(); // 是不是应用了精确定位
    if (!hasExactPosition) {
      return;
    }
    // 如果是精确定位，也就是预设位置空间不足以承载弹出元素，被重新指定新的弹出位置
    const paneRect = positionStrategy._pane.getBoundingClientRect(); // 弹出pane元素Rect
    const triggerElReact = this.elRef.nativeElement.getBoundingClientRect(); // 触发点Rect

    const position = positionStrategy._lastPosition; // 当前策略位置（调整后的最佳的）
    let xOrigin: 'left' | 'right' | 'center';
    const yOrigin: 'top' | 'bottom' | 'center' = position.overlayY;
    if (position.overlayX === 'center') {
      xOrigin = 'center';
    } else {
      xOrigin = position.overlayX === 'start' ? 'left' : 'right';
    }

    const origins: string[] = [xOrigin, yOrigin];
    if (
      xOrigin === 'center' ||
      (xOrigin === 'left' &&
        ![triggerElReact.right, triggerElReact.left].includes(paneRect.left)) ||
      (xOrigin === 'right' &&
        ![triggerElReact.right, triggerElReact.left].includes(paneRect.right))
    ) {
      const originLeft =
        triggerElReact.left - paneRect.left + triggerElReact.width / 2;
      origins[0] = Math.min(originLeft, paneRect.width) + 'px';
    }
    if (
      yOrigin === 'center' ||
      (yOrigin === 'top' &&
        ![triggerElReact.bottom, triggerElReact.top].includes(paneRect.top)) || // 位置没有被完全被颠倒的
      (yOrigin === 'bottom' &&
        ![triggerElReact.bottom, triggerElReact.top].includes(paneRect.bottom)) // 位置没有被完全被颠倒的
    ) {
      const originTop =
        triggerElReact.top - paneRect.top + triggerElReact.height / 2;
      origins[1] = Math.min(originTop, paneRect.height) + 'px';
    }
    const aniEls = positionStrategy._boundingBox.querySelectorAll<HTMLElement>(
      positionStrategy._transformOriginSelector,
    );
    Array.from(aniEls).forEach(el => {
      el.style.transformOrigin = origins.join(' ');
    });
  }

  _createTooltip() {
    if (this.disabled || this.isCreated) {
      return;
    }
    this._disposeTooltip();
    this.overlayRef = this.createOverlay();
    const portal = new ComponentPortal(
      this.componentClass,
      this.viewContainerRef,
    );
    this.componentIns = this.overlayRef.attach(portal).instance;
    this.componentIns.setupInputs({
      inputClass$: this.inputClass$$.asObservable(),
      inputContent$: this.inputContent$$.asObservable(),
      inputContext$: this.inputContext$$.asObservable(),
      inputPosition$: this.inputPosition$$.asObservable(),
      inputType$: this.inputType$$.asObservable(),
      disableAnimation: this.disableAnimation,
    });
    this.componentIns.hide$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this._disposeTooltip();
    });

    if (!this.disableAnimation) {
      merge(
        this.componentIns.beforeHide$,
        this.componentIns.beforeShow$.pipe(delay(0)),
      )
        .pipe(takeUntil(this.destroy$))
        .subscribe(this._updateTransformOrigin.bind(this));
    }

    if (this.trigger === TooltipTrigger.Hover) {
      this.componentIns.hover$
        .pipe(takeUntil(this.componentIns.destroy$))
        .subscribe(hovered => {
          this.onTooltipHovered(hovered);
        });
    }
    if (
      this.trigger === TooltipTrigger.Hover ||
      this.trigger === TooltipTrigger.Click
    ) {
      this.unlistenBody = this.renderer.listen(
        'body',
        'click',
        this.onBodyClick.bind(this),
      );
    }

    this.componentIns?.show();
    this.cdr.markForCheck();

    this.visibleChange.emit(true);
  }

  _disposeTooltip() {
    this.componentIns?.animating$$
      .pipe(
        filter(animating => !animating),
        first(),
      )
      .subscribe(() => {
        if (this.overlayRef) {
          this.overlayRef.dispose();
          this.overlayRef = null;
          this.componentIns = null;
          this.tooltipHovered = false;
          if (this.unlistenBody) {
            this.unlistenBody();
            this.unlistenBody = null;
          }
          this.visibleChange.emit(false);
        }
      });
  }

  toggleTooltip() {
    if (this.isCreated) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    this._createTooltip();
  }

  hide() {
    if (this.disableAnimation) {
      // 如果禁用了动画就立即销毁，而不是等动画完成事件后才销毁
      this._disposeTooltip();
    } else {
      this.componentIns?.hide();
    }
  }

  updatePosition() {
    if (this.overlayRef) {
      this.overlayRef.updatePosition();
    }
  }

  ngAfterViewInit() {
    if (this.trigger === TooltipTrigger.Hover) {
      this.updateListeners();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
    this._disposeTooltip();
    this.clearListeners();
  }

  protected updateListeners() {
    this.clearListeners();
    switch (this.trigger) {
      case TooltipTrigger.Click: {
        this.listeners.push(
          this.renderer.listen(
            this.elRef.nativeElement,
            'click',
            this.onClick.bind(this) as () => void,
          ),
        );
        break;
      }
      case TooltipTrigger.Hover: {
        this.listeners.push(
          this.renderer.listen(
            this.elRef.nativeElement,
            'mouseenter',
            this.onMouseEnter.bind(this) as () => void,
          ),
          this.renderer.listen(
            this.elRef.nativeElement,
            'mouseleave',
            this.onMouseLeave.bind(this) as () => void,
          ),
        );
        break;
      }
      case TooltipTrigger.Focus: {
        this.listeners.push(
          this.renderer.listen(
            this.elRef.nativeElement,
            'focus',
            this.onFocus.bind(this),
          ),
          this.renderer.listen(
            this.elRef.nativeElement,
            'blur',
            this.onBlur.bind(this),
          ),
        );
        break;
      }
      case TooltipTrigger.Manual: {
        break;
      }
    }
  }

  protected clearListeners() {
    this.listeners.forEach(unListen => {
      unListen();
    });
    this.listeners = [];
  }

  protected createOverlay(): OverlayRef {
    const originPosition = getOriginPosition(this.position);
    const overlayPosition = getOverlayPosition(this.position);

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elRef)
      .withGrowAfterOpen(true)
      .withTransformOriginOn('.aui-tooltip')
      .withPositions([
        { ...originPosition.main, ...overlayPosition.main },
        { ...originPosition.fallback, ...overlayPosition.fallback },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const config = new OverlayConfig({
      positionStrategy,
      scrollStrategy,
    });
    return this.overlay.create(config);
  }

  protected async onMouseEnter() {
    this.hostHovered = true;
    if (!this.isCreated) {
      await sleep(DISPLAY_DELAY);
      if (this.hostHovered) {
        this._createTooltip();
      }
    }
  }

  protected async onMouseLeave() {
    this.hostHovered = false;
    await sleep(HIDDEN_DELAY);
    if (!this.tooltipHovered && !this.hostHovered) {
      this.hide();
    }
  }

  protected async onTooltipHovered(hovered: boolean) {
    this.tooltipHovered = hovered;
    if (!hovered) {
      await sleep(HIDDEN_DELAY);
      if (!this.tooltipHovered && !this.hostHovered) {
        this.hide();
      }
    }
  }

  protected onClick() {
    this.toggleTooltip();
  }

  protected onBodyClick(event: Event) {
    if (
      !this.elRef.nativeElement.contains(event.target as Node) &&
      (this.hideOnClick ||
        !this.componentIns.elRef.nativeElement.contains(event.target as Node))
    ) {
      this.hide();
    }
  }

  protected onFocus() {
    this._createTooltip();
  }

  protected onBlur() {
    this.hide();
  }
}
