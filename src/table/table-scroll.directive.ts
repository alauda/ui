import { Directionality } from '@angular/cdk/bidi';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Host,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import {
  Subject,
  fromEvent,
  merge,
  startWith,
  takeUntil,
  switchMap,
  NEVER,
  BehaviorSubject,
} from 'rxjs';

import { coerceAttrBoolean, observeResizeOn } from '../utils';

import { TableComponent } from './table.component';

const CLASS_PREFIX = 'aui-table';
const SHADOW_CLASS = `${CLASS_PREFIX}__scroll-shadow`;
const HAS_SCROLL_CLASS = `${SHADOW_CLASS}--has-scroll`;
const SCROLLING_CLASS = `${SHADOW_CLASS}--scrolling`;
const SCROLL_BEFORE_END_CLASS = `${SHADOW_CLASS}--before-end`;

const HAS_TABLE_TOP_SHADOW = 'hasTableTopShadow';
const HAS_TABLE_BOTTOM_SHADOW = 'hasTableBottomShadow';
const HAS_TABLE_VERTICAL_SCROLL = 'hasTableVerticalScroll';

@Directive({
  selector: '[auiTableScrollWrapper]',
  host: {
    class: 'aui-table__scroll-wrapper',
  },
})
export class TableScrollWrapperDirective {
  @HostBinding('style.max-height')
  @Input()
  auiTableScrollWrapper = '100%';
}

@Directive({
  selector: '[auiTableScrollable]',
  providers: [
    { provide: CdkScrollable, useExisting: TableScrollableDirective },
  ],
})
export class TableScrollableDirective
  extends CdkScrollable
  implements AfterViewInit, OnInit, OnDestroy
{
  @Input('auiTableScrollable')
  set scrollable(scrollable: boolean | '') {
    this._scrollable = coerceAttrBoolean(scrollable);
    this.scrollable$$.next(this._scrollable);
  }

  get scrollable() {
    return this._scrollable;
  }

  private _scrollable = true;

  scrollable$$ = new BehaviorSubject<boolean>(this._scrollable);
  destroy$$ = new Subject<void>();

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    scrollDispatcher: ScrollDispatcher,
    ngZone: NgZone,
    @Host() private readonly table: TableComponent<unknown>,
    @Optional() dir?: Directionality,
  ) {
    super(el, scrollDispatcher, ngZone, dir);
  }

  @HostBinding(`class.${SCROLL_BEFORE_END_CLASS}`)
  SCROLL_BEFORE_END_CLASS = true;

  @HostBinding(`class.${SHADOW_CLASS}`)
  SHADOW_CLASS = true;

  get containerEl() {
    return this.el.nativeElement;
  }

  override ngOnInit() {
    if (this.scrollable) {
      this.scrollDispatcher.register(this);
    }
  }

  ngAfterViewInit() {
    this.viewMutation();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  viewMutation() {
    this.scrollable$$
      .pipe(
        switchMap(scrollable => {
          if (scrollable) {
            this.scrollDispatcher.register(this);
            return merge(
              observeResizeOn(this.containerEl),
              fromEvent(this.containerEl, 'scroll'),
            ).pipe(startWith(null));
          }

          this.scrollDispatcher.deregister(this);
          return NEVER;
        }),
      )
      .pipe(takeUntil(this.destroy$$))
      .subscribe(() => {
        this.mutateVerticalScroll();
        this.mutateHorizontalScroll();
      });
  }

  mutateVerticalScroll() {
    const scrollDis =
      this.containerEl.scrollHeight - this.containerEl.offsetHeight;

    this.placeClassList(
      this.containerEl.classList,
      scrollDis > 0,
      HAS_TABLE_VERTICAL_SCROLL,
    );

    const scrollTop = this.containerEl.scrollTop;
    this.placeClassList(
      this.containerEl.classList,
      scrollTop > 0,
      HAS_TABLE_TOP_SHADOW,
    );
    this.placeClassList(
      this.containerEl.classList,
      scrollTop < scrollDis,
      HAS_TABLE_BOTTOM_SHADOW,
    );

    // 兼容屏幕缩放是 sticky多列的样式问题
    this.table.updateStickyColumnStyles();
  }

  mutateHorizontalScroll() {
    const scrollDis =
      this.containerEl.scrollWidth - this.containerEl.offsetWidth;

    this.placeClassList(
      this.containerEl.classList,
      scrollDis > 0,
      HAS_SCROLL_CLASS,
    );

    const scrollLeft = this.containerEl.scrollLeft;
    this.placeClassList(
      this.containerEl.classList,
      scrollLeft > 0,
      SCROLLING_CLASS,
    );
    this.placeClassList(
      this.containerEl.classList,
      scrollLeft < scrollDis,
      SCROLL_BEFORE_END_CLASS,
    );
  }

  placeClassList(
    classList: DOMTokenList,
    condition: boolean,
    className: string,
  ) {
    classList[condition ? 'add' : 'remove'](className);
  }
}
