import { AnimationEvent } from '@angular/animations';
import { OverlayRef } from '@angular/cdk/overlay';
import {
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
  PortalModule,
} from '@angular/cdk/portal';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  ViewChild,
  ViewEncapsulation,
  Renderer2,
} from '@angular/core';

import { Bem, buildBem, getElementOffset } from '../utils';

import {
  dialogAnimations,
  FADE_CLASS_NAME_MAP,
  FADE_SLOW_CLASS_NAME_MAP,
  ZOOM_CLASS_NAME_MAP,
  ZOOM_SLOW_CLASS_NAME_MAP,
  ANIMATION_DURATION_BASE_CLASSES,
  WHITELIST_TRANSFORM_ANIMATION_ELEMENTS,
} from './dialog-animations';
import { DialogConfig } from './dialog-config';
import { throwDialogContentAlreadyAttachedError } from './utils';

@Component({
  selector: 'aui-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Default,
  preserveWhitespaces: false,
  animations: [dialogAnimations.dialogContainer],
  host: {
    '[@.disabled]': 'config.noAnimation',
    '[@dialogContainer]': 'state',
    '(@dialogContainer.start)': 'onAnimationStart($event)',
    '(@dialogContainer.done)': 'onAnimationDone($event)',
  },
  standalone: true,
  imports: [NgClass, PortalModule],
})
export class DialogComponent {
  @ViewChild(CdkPortalOutlet, { static: true })
  portalOutlet: CdkPortalOutlet;

  bem: Bem = buildBem('aui-dialog');

  config: DialogConfig;

  // animation state
  state: 'void' | 'enter' | 'exit' = 'enter';

  animationStateChanged = new EventEmitter<AnimationEvent>();

  elementFocusedBeforeModalWasOpened: HTMLElement;

  overlayRef: OverlayRef;

  get id() {
    return this._id;
  }

  set id(value) {
    this.elementRef.nativeElement.dataset.id = value;
  }

  private readonly _id: string;

  get rootClass() {
    return `${this.bem.block(this.config.size)} ${
      this.config.fitViewport ? this.bem.modifier('fit-viewport') : ''
    } ${this.config.customClass || ''}`;
  }

  get zoomClassMap() {
    return ANIMATION_DURATION_BASE_CLASSES.includes(this.config.size)
      ? ZOOM_CLASS_NAME_MAP
      : ZOOM_SLOW_CLASS_NAME_MAP;
  }

  get fadeClassMap() {
    return ANIMATION_DURATION_BASE_CLASSES.includes(this.config.size)
      ? FADE_CLASS_NAME_MAP
      : FADE_SLOW_CLASS_NAME_MAP;
  }

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly render: Renderer2,
  ) {}

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throwDialogContentAlreadyAttachedError();
    }
    this.blurActiveElement();
    return this.portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throwDialogContentAlreadyAttachedError();
    }
    this.blurActiveElement();
    return this.portalOutlet.attachTemplatePortal(portal);
  }

  onAnimationDone(event: AnimationEvent): void {
    this.cleanAnimationClass();
    this.animationStateChanged.emit(event);
  }

  onAnimationStart(event: AnimationEvent): void {
    if (event.toState === 'enter') {
      this.setEnterAnimationClass();
    } else if (event.toState === 'exit') {
      this.setExitAnimationClass();
    }
  }

  startExitAnimation(): void {
    this.state = 'exit';
  }

  private blurActiveElement() {
    const activeElement = document.activeElement as HTMLElement;
    if (document) {
      this.elementFocusedBeforeModalWasOpened =
        WHITELIST_TRANSFORM_ANIMATION_ELEMENTS.includes(activeElement.tagName)
          ? activeElement
          : null;
      activeElement.blur();
    }
  }

  private cleanAnimationClass(): void {
    if (this.config.noAnimation) {
      return;
    }
    const backdropElement = this.overlayRef.backdropElement;
    const modalElement = this.elementRef.nativeElement.firstElementChild;

    if (backdropElement) {
      backdropElement.classList.remove(this.fadeClassMap.enter);
      backdropElement.classList.remove(this.fadeClassMap.enterActive);
    }

    modalElement.classList.remove(this.zoomClassMap.enter);
    modalElement.classList.remove(this.zoomClassMap.enterActive);
    modalElement.classList.remove(this.zoomClassMap.leave);
    modalElement.classList.remove(this.zoomClassMap.leaveActive);
  }

  private setEnterAnimationClass(): void {
    if (this.config.noAnimation) {
      return;
    }

    this.setModalTransformOrigin();

    const modalElement = this.elementRef.nativeElement.firstElementChild;
    const backdropElement = this.overlayRef.backdropElement;
    modalElement.classList.add(this.zoomClassMap.enter);
    modalElement.classList.add(this.zoomClassMap.enterActive);

    if (backdropElement) {
      backdropElement.classList.add(this.fadeClassMap.enter);
      backdropElement.classList.add(this.fadeClassMap.enterActive);
    }
  }

  private setExitAnimationClass(): void {
    if (this.config.noAnimation) {
      return;
    }

    const modalElement = this.elementRef.nativeElement.firstElementChild;
    modalElement.classList.add(this.zoomClassMap.leave);
    modalElement.classList.add(this.zoomClassMap.leaveActive);

    this.setMaskExitAnimationClass();
  }

  private setMaskExitAnimationClass(): void {
    const backdropElement = this.overlayRef.backdropElement;

    if (backdropElement) {
      backdropElement.classList.add(this.fadeClassMap.leave);
      backdropElement.classList.add(this.fadeClassMap.leaveActive);
    }
  }

  private setModalTransformOrigin(): void {
    const modalElement = this.elementRef.nativeElement
      .firstElementChild as HTMLDivElement;

    if (this.elementFocusedBeforeModalWasOpened) {
      const previouslyDOMRect =
        this.elementFocusedBeforeModalWasOpened.getBoundingClientRect();
      const lastPosition = getElementOffset(
        this.elementFocusedBeforeModalWasOpened,
      );
      const x = lastPosition.left + previouslyDOMRect.width / 2;
      const y = lastPosition.top + previouslyDOMRect.height / 2;
      const transformOrigin = `${x - modalElement.offsetLeft}px ${
        y - modalElement.offsetTop
      }px 0px`;
      this.render.setStyle(modalElement, 'transform-origin', transformOrigin);
    }
  }
}
