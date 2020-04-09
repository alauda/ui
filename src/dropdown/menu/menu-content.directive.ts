import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  Inject,
  Injector,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '*[auiMenuContent]',
  exportAs: 'auiMenuContent',
})
export class MenuContentDirective implements OnDestroy {
  private portal: TemplatePortal;
  private outlet: DomPortalOutlet;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly appRef: ApplicationRef,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly injector: Injector,
    @Inject(DOCUMENT) private readonly document: any,
  ) {}

  attach(context: any) {
    this.detach();
    if (!this.portal) {
      this.portal = new TemplatePortal(this.templateRef, this.viewContainerRef);
    }
    if (!this.outlet) {
      this.outlet = new DomPortalOutlet(
        this.document.createElement('div'),
        this.componentFactoryResolver,
        this.appRef,
        this.injector,
      );
    }
    const el: HTMLElement = this.templateRef.elementRef.nativeElement;
    el.parentNode.insertBefore(this.outlet.outletElement, el);
    this.portal.attach(this.outlet, context);
  }

  detach() {
    if (this.portal?.isAttached) {
      this.portal.detach();
    }
  }

  ngOnDestroy() {
    if (this.outlet) {
      this.outlet.dispose();
    }
  }
}
