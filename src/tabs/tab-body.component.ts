import {
  CdkPortal,
  CdkPortalOutlet,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { coerceAttrBoolean } from '../utils';

@Component({
  selector: 'aui-tab-body',
  templateUrl: './tab-body.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class TabBodyComponent implements OnDestroy {
  private _content: TemplatePortal;

  content$ = new BehaviorSubject<TemplatePortal>(null);

  /** The portal host inside of this container into which the tab body content will be loaded. */
  @ViewChild(CdkPortalOutlet, { static: true })
  _portalOutlet: CdkPortalOutlet;

  /** The tab body content to display. */
  @Input()
  get content() {
    return this._content;
  }

  set content(content: TemplatePortal) {
    if (this._content !== content) {
      this.content$.next(content);
    }
    this._content = content;
  }

  ngOnDestroy() {
    this.content$.complete();
  }
}

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
  /** Whether or not the tab is disabled  */
  @Input({ transform: coerceAttrBoolean })
  disabled: boolean;

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

@Directive({
  selector: '[auiTabTitle]',
})
export class TabTitleDirective extends CdkPortal {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    templateRef: TemplateRef<any>,
    viewContainerRef: ViewContainerRef,
  ) {
    super(templateRef, viewContainerRef);
  }
}

/**
 * The portal host directive for the contents of the tab.
 */
@Directive({
  selector: '[auiTabBodyHost]',
})
export class TabBodyPortalDirective
  extends CdkPortalOutlet
  implements OnInit, OnDestroy
{
  private _hostSubscription = Subscription.EMPTY;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    private readonly _host: TabBodyComponent,
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  /** Set initial visibility or set up subscription for changing visibility. */
  override ngOnInit(): void {
    super.ngOnInit();
    this._hostSubscription = this._host.content$.subscribe(content => {
      if (this.hasAttached) {
        this.detach();
      }
      this.attach(content);
    });
  }

  override ngOnDestroy() {
    this._hostSubscription.unsubscribe();
  }
}
