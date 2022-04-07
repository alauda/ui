import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  AfterContentChecked,
  AfterContentInit,
  ApplicationRef,
  ComponentFactoryResolver,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { Subject, fromEvent, merge } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { observeResizeOn } from '../utils';

import { AnchorComponent } from './anchor.component';

let uid = 0;

@Directive()
export class AnchorDirectiveChild {
  readonly parent: AnchorDirective;

  constructor(protected injector: Injector) {
    this.parent = this.injector.get(AnchorDirective);
  }
}

@Directive({
  selector: '[auiAnchorLabel]',
})
export class AnchorLabelDirective
  extends AnchorDirectiveChild
  implements OnInit, AfterContentChecked
{
  @HostBinding('class.aui-anchor__label')
  @Input('auiAnchorLabel')
  get label() {
    return this._label || this.elRef.nativeElement.textContent;
  }

  set label(value) {
    this._label = value;
    this.labelChange.emit(value);
  }

  private _label: string | TemplateRef<unknown>;

  @Input('auiAnchorLabelContext')
  labelContext: unknown;

  get target() {
    return this.elRef.nativeElement;
  }

  @Input()
  set id(id) {
    if (this.parent.injectId && !this.id) {
      this.elRef.nativeElement.id = id;
    }
    this._id = id;
  }

  get id() {
    return this._id;
  }

  private _id: string;

  @Input()
  set level(value: number | '') {
    this._level = value === '' ? 1 : value;
  }

  get level() {
    return this._level;
  }

  private _level = 0;

  @Output()
  labelChange = new EventEmitter<string | TemplateRef<unknown>>();

  constructor(
    protected override injector: Injector,
    public readonly elRef: ElementRef<HTMLElement>,
  ) {
    super(injector);
    this._id = this.elRef.nativeElement.id;
  }

  ngOnInit() {
    if (!this.id) {
      this.id = 'anchor-uid-' + uid++;
    }
  }

  ngAfterContentChecked() {
    if (!this._label) {
      this.labelChange.emit(this.label);
    }
  }
}

@Directive({
  selector: '[auiAnchor]',
})
export class AnchorDirective implements AfterContentInit, OnDestroy {
  @Input()
  auiAnchor: HTMLElement | '';

  @Input()
  adaptPosition = true;

  @Input()
  padding = 20;

  @Input()
  minTop: number;

  @Input()
  injectId = window === window.top;

  @ContentChildren(AnchorLabelDirective, { descendants: true })
  anchorLabels: QueryList<AnchorLabelDirective>;

  get containerEl() {
    return this.elRef.nativeElement;
  }

  get scrollableEl() {
    const el = this.containerEl;
    return (
      this.auiAnchor ||
      this.cdkScrollable?.getElementRef().nativeElement ||
      (el.scrollHeight > el.offsetHeight ? el : window)
    );
  }

  anchorPortal: ComponentPortal<AnchorComponent>;

  destroy$$ = new Subject<void>();

  constructor(
    private readonly cfr: ComponentFactoryResolver,
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
    public readonly elRef: ElementRef<HTMLElement>,
    @Optional() private readonly cdkScrollable: CdkScrollable,
  ) {}

  ngAfterContentInit() {
    const containerEl = this.containerEl;
    this.anchorPortal = new ComponentPortal(AnchorComponent);
    const portalOutlet = new DomPortalOutlet(
      document.body,
      this.cfr,
      this.appRef,
      this.injector,
    );
    const anchorComponentRef = this.anchorPortal.attach(portalOutlet);
    const anchorEl = anchorComponentRef.injector.get(ElementRef)
      .nativeElement as HTMLElement;

    requestAnimationFrame(() =>
      this.adaptAnchorPosition(containerEl, anchorEl),
    );

    this.anchorLabels.changes
      .pipe(startWith(this.anchorLabels), takeUntil(this.destroy$$))
      .subscribe((anchorLabels: QueryList<AnchorLabelDirective>) => {
        Object.assign(anchorComponentRef.instance, {
          items: anchorLabels.toArray(),
        });
      });
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
    this.anchorPortal.detach();
  }

  adaptAnchorPosition(containerEl: HTMLElement, anchorEl: HTMLElement) {
    const pageContentEl = containerEl.closest('.aui-page__content');
    const anchorContentEl = anchorEl.querySelector('.aui-anchor');

    merge(observeResizeOn(containerEl), fromEvent(window, 'scroll'))
      .pipe(startWith(null as void), takeUntil(this.destroy$$))
      .subscribe(() => {
        const containerRect = containerEl.getBoundingClientRect();
        Object.assign(anchorEl.style, {
          display: !containerRect.width || !containerRect.height ? 'none' : '',
          left:
            containerRect.right -
            anchorContentEl.getBoundingClientRect().width +
            'px',
          top:
            Math.max(
              containerRect.top,
              (this.minTop ??
                (pageContentEl &&
                  +getComputedStyle(pageContentEl).paddingTop.slice(0, -2))) ||
                0,
            ) + 'px',
        });
      });

    if (this.adaptPosition) {
      observeResizeOn(anchorContentEl)
        .pipe(takeUntil(this.destroy$$))
        .subscribe(el => {
          const width = el.getBoundingClientRect().width;
          const padding = width + this.padding;
          containerEl.style.paddingRight = padding + 'px';
        });
    }
  }
}
