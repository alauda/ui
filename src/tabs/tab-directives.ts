import { CdkPortal, CdkPortalOutlet } from '@angular/cdk/portal';
import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { coerceAttrBoolean } from '../utils';

import { TabBodyComponent } from './tab-body.component';

/** Used to flag tab labels for use with the portal directive */
@Directive({
  selector: '[auiTabLabel]',
})
export class TabLabelDirective extends CdkPortal {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    templateRef: TemplateRef<any>,
    viewContainerRef: ViewContainerRef,
  ) {
    super(templateRef, viewContainerRef);
  }
}

/**
 * Lazy load the embedded template for a tab content.
 */
@Directive({
  selector: '[auiTabContent]',
})
export class TabContentDirective {
  constructor(public template: TemplateRef<any>) {}
}

/** Used to project additional template from host to the tab header. */
@Directive({
  selector: '[auiTabHeaderAddon]',
})
export class TabHeaderAddonDirective extends CdkPortal {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    templateRef: TemplateRef<any>,
    viewContainerRef: ViewContainerRef,
  ) {
    super(templateRef, viewContainerRef);
  }
}

/**
 * Used in the `aui-tab-group` view to display tab labels.
 */
@Directive({
  selector: '[auiTabLabelWrapper]',
  host: {
    '[class.aui-tab-label]': 'true',
    '[class.aui-tab-label--disabled]': '!!disabled',
  },
})
export class TabLabelWrapperDirective {
  private _disabled: boolean;

  /** Whether or not the tab is disabled  */
  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(value: boolean | '') {
    this._disabled = coerceAttrBoolean(value);
  }

  getOffsetLeft(): number {
    return this.elementRef.nativeElement.offsetLeft;
  }

  getOffsetWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }

  /** Sets focus on the wrapper element */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

/**
 * The portal host directive for the contents of the tab.
 */
@Directive({
  selector: '[auiTabBodyHost]',
})
export class TabBodyPortalDirective
  extends CdkPortalOutlet
  implements OnInit, OnDestroy {
  private _hostSubscription = Subscription.EMPTY;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    private readonly _host: TabBodyComponent,
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  /** Set initial visibility or set up subscription for changing visibility. */
  ngOnInit(): void {
    super.ngOnInit();
    this._hostSubscription = this._host.content$.subscribe(content => {
      if (this.hasAttached) {
        this.detach();
      }
      this.attach(content);
    });
  }

  ngOnDestroy() {
    this._hostSubscription.unsubscribe();
  }
}
