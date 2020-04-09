import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, ReplaySubject, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { sleep } from '../utils/async';

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
  show: EventEmitter<void>;
  hide: EventEmitter<void>;
}

export class BaseTooltip implements TooltipInterface, AfterViewInit, OnDestroy {
  static readonly DELAY_TIMES = 50;

  set content(value: string | TemplateRef<any>) {
    this.inputContent$$.next(value);
  }

  set context(value: any) {
    this.inputContext$$.next(value);
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

  get position() {
    return this._position;
  }

  set position(value: string) {
    if (!value || value === this._position) {
      return;
    }
    this._position = value;
    this.inputPosition$$.next(value);
    this.disposeTooltip();
  }

  get trigger() {
    return this._trigger;
  }

  set trigger(value) {
    if (!value || value === this._trigger) {
      return;
    }
    this._trigger = value;
    this.disposeTooltip();
    this.ngZone.run(this.updateListeners, this);
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    this._disabled = value;
    if (value) {
      this.disposeTooltip();
    }
  }

  hideOnClick = false;

  show = new EventEmitter<void>();
  hide = new EventEmitter<void>();

  protected overlayRef: OverlayRef;
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
  protected tooltipChanged$: Observable<void> = merge(
    this.inputContent$$,
    this.inputType$$,
    this.inputPosition$$,
    this.inputClass$$,
    this.inputContext$$,
  );

  protected _position = 'top';
  protected _trigger = TooltipTrigger.Hover;
  protected _disabled = false;

  get isCreated() {
    return !!this.overlayRef;
  }

  constructor(
    protected overlay: Overlay,
    protected viewContainerRef: ViewContainerRef,
    protected elRef: ElementRef,
    protected renderer: Renderer2,
    protected cdr: ChangeDetectorRef,
    protected ngZone: NgZone,
  ) {
    this.tooltipChanged$.pipe(debounceTime(0)).subscribe(() => {
      this.updatePosition();
    });
  }

  createTooltip() {
    if (this.disabled || this.isCreated) {
      return;
    }
    this.overlayRef = this.createOverlay();
    const portal = new ComponentPortal(TooltipComponent, this.viewContainerRef);
    this.componentIns = this.overlayRef.attach(portal).instance;
    this.componentIns.setupInputs({
      inputClass$: this.inputClass$$.asObservable(),
      inputContent$: this.inputContent$$.asObservable(),
      inputContext$: this.inputContext$$.asObservable(),
      inputPosition$: this.inputPosition$$.asObservable(),
      inputType$: this.inputType$$.asObservable(),
    });

    if (this.trigger === TooltipTrigger.Hover) {
      this.componentIns.hover$.subscribe(this.onTooltipHovered.bind(this));
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

    this.show.emit();

    this.cdr.markForCheck();
  }

  disposeTooltip() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.componentIns = null;
      this.tooltipHovered = false;
      if (this.unlistenBody) {
        this.unlistenBody();
        this.unlistenBody = null;
      }
      this.hide.emit();
    }
  }

  toggleTooltip() {
    if (this.isCreated) {
      this.disposeTooltip();
    } else {
      this.createTooltip();
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
    this.disposeTooltip();
    this.clearListeners();
  }

  protected updateListeners() {
    this.clearListeners();
    switch (this.trigger) {
      case TooltipTrigger.Click:
        this.listeners.push(
          this.renderer.listen(
            this.elRef.nativeElement,
            'click',
            this.onClick.bind(this) as () => void,
          ),
        );
        break;
      case TooltipTrigger.Hover:
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
      case TooltipTrigger.Focus:
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
      case TooltipTrigger.Manual:
        break;
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
      await sleep(BaseTooltip.DELAY_TIMES);
      if (this.hostHovered) {
        this.createTooltip();
      }
    }
  }

  protected async onMouseLeave() {
    this.hostHovered = false;
    await sleep(BaseTooltip.DELAY_TIMES);
    if (!this.tooltipHovered && !this.hostHovered) {
      this.disposeTooltip();
    }
  }

  protected async onTooltipHovered(hovered: boolean) {
    this.tooltipHovered = hovered;
    if (!hovered) {
      await sleep(BaseTooltip.DELAY_TIMES);
      if (!this.tooltipHovered && !this.hostHovered) {
        this.disposeTooltip();
      }
    }
  }

  protected onClick() {
    this.toggleTooltip();
  }

  protected onBodyClick(event: Event) {
    if (
      !this.elRef.nativeElement.contains(event.target) &&
      (this.hideOnClick ||
        !this.componentIns.elRef.nativeElement.contains(event.target))
    ) {
      this.disposeTooltip();
    }
  }

  protected onFocus() {
    this.createTooltip();
  }

  protected onBlur() {
    this.disposeTooltip();
  }
}
