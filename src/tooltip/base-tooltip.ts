import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
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
import { ReplaySubject, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  show: EventEmitter<void>;
  hide: EventEmitter<void>;
}

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class BaseTooltip<T = any>
  implements TooltipInterface, AfterViewInit, OnDestroy {
  set content(value: string | TemplateRef<any>) {
    this.inputContent$$.next(value);
  }

  get context() {
    return this._context;
  }

  set context(value: T) {
    this._context = value;
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

  delay = 50;
  hideOnClick = false;

  show = new EventEmitter<void>();
  hide = new EventEmitter<void>();

  protected overlayRef: OverlayRef;
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

  protected _position = 'top';
  protected _trigger = TooltipTrigger.Hover;
  protected _disabled = false;
  protected _context: T;

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

  createTooltip() {
    if (this.disabled || this.isCreated) {
      return;
    }
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
    });

    if (this.trigger === TooltipTrigger.Hover) {
      this.componentIns.hover$.subscribe(hovered => {
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
      await sleep(this.delay);
      if (this.hostHovered) {
        this.createTooltip();
      }
    }
  }

  protected async onMouseLeave() {
    this.hostHovered = false;
    await sleep(this.delay);
    if (!this.tooltipHovered && !this.hostHovered) {
      this.disposeTooltip();
    }
  }

  protected async onTooltipHovered(hovered: boolean) {
    this.tooltipHovered = hovered;
    if (!hovered) {
      await sleep(this.delay);
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
      !this.elRef.nativeElement.contains(event.target as Node) &&
      (this.hideOnClick ||
        !this.componentIns.elRef.nativeElement.contains(event.target as Node))
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
