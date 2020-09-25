import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  HostListener,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

import { MessageAnimations } from '../message/message-animations';
import { MessageComponent } from '../message/message.component';
import { Bem, buildBem } from '../utils/bem';

import { NotificationConfig } from './notification.config';

let uniqueId = 0;

@Component({
  selector: 'aui-notification',
  templateUrl: './notification.component.html',
  animations: [MessageAnimations.inOut],
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class NotificationComponent
  extends MessageComponent
  implements AfterViewInit {
  protected readonly animateStartState = 'flyLeft';
  protected readonly animateStartEnd = 'flyUp';

  bem: Bem = buildBem('aui-notification');
  animateState = this.animateStartState;
  uniqueId = `aui-notification-${uniqueId++}`;
  isHover = false;

  title: string;
  remains: number;
  childComponentInstance: unknown;
  customClass = '';

  @ViewChild(CdkPortalOutlet, { static: true })
  private readonly portalOutlet: CdkPortalOutlet;

  @ViewChild('modalComponent', { read: ViewContainerRef, static: true })
  private readonly modalEl: ViewContainerRef;

  constructor(
    viewContainerRef: ViewContainerRef,
    cdr: ChangeDetectorRef,
    private readonly cfr: ComponentFactoryResolver,
  ) {
    super(viewContainerRef, cdr);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.duration <= 0) {
      return;
    }
    this.isHover = true;
    clearTimeout(this.timerId);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.duration <= 0) {
      return;
    }
    this.isHover = false;
    this.countDown();
  }

  ngAfterViewInit() {
    if (this.remains > 0) {
      this.countDown();
    }
  }

  setConfig(config: NotificationConfig) {
    super.setConfig(config);
    this.title = config.title;
    this.remains = Math.ceil(this.duration / 1000);
    this.customClass = config.customClass || '';

    if (config.contentRef) {
      if (config.contentRef instanceof TemplateRef) {
        const portal = new TemplatePortal(config.contentRef, null, {
          $implicit: config.context,
        });
        this.attachTemplatePortal(portal);
      } else {
        this.attachComponentRef(
          this.cfr.resolveComponentFactory(config.contentRef),
        );
      }
    }
  }

  /**
   * Attach a TemplatePortal as content to this modal container.
   * @param portal Portal to be attached as the modal content.
   */
  private attachTemplatePortal<C>(
    portal: TemplatePortal<C>,
  ): EmbeddedViewRef<C> {
    return this.portalOutlet.attachTemplatePortal(portal);
  }

  private attachComponentRef(componentRef: ComponentFactory<unknown>) {
    this.childComponentInstance = this.modalEl.createComponent(
      componentRef,
      null,
      this.viewContainerRef.injector,
    ).instance;
    return this.childComponentInstance;
  }

  private countDown() {
    this.timerId = window.setTimeout(() => {
      this.remains -= 1;
      if (this.remains === 0) {
        this.remove();
      } else {
        this.countDown();
      }
      this.cdr.markForCheck();
    }, 1000);
  }
}
