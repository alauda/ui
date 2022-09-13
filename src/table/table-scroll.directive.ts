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
  selector: '[auiTableScrollShadow]',
  providers: [
    { provide: CdkScrollable, useExisting: TableScrollShadowDirective },
  ],
})
export class TableScrollShadowDirective
  extends CdkScrollable
  implements AfterViewInit, OnDestroy
{
  scrollShadow$$ = new BehaviorSubject<boolean>(false);

  destroy$$ = new Subject<void>();

  @Input()
  set auiTableScrollShadow(scrollShadow: boolean | '') {
    this.scrollShadow$$.next(coerceAttrBoolean(scrollShadow));
  }

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

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.viewMutation();
    });
  }

  viewMutation() {
    this.scrollShadow$$
      .pipe(
        switchMap(scrollShadow =>
          scrollShadow
            ? merge(
                observeResizeOn(this.containerEl),
                fromEvent(this.containerEl, 'scroll'),
              ).pipe(startWith(null))
            : NEVER,
        ),
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

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
