import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { Subject, fromEvent, merge } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { observeResizeOn } from '../utils';

const CLASS_PREFIX = 'aui-table';
const SHADOW_CLASS = `${CLASS_PREFIX}__scroll-shadow`;
const HAS_SCROLL_CLASS = `${SHADOW_CLASS}--has-scroll`;
const SCROLLING_CLASS = `${SHADOW_CLASS}--scrolling`;
const SCROLL_BEFORE_END_CLASS = `${SHADOW_CLASS}--before-end`;

const HAS_TABLE_TOP_SHADOW = 'hasTableTopShadow';
const HAS_TABLE_BOTTOM_SHADOW = 'hasTableBottomShadow';
const HAS_TABLE_VERTICAL_SCROLL = 'hasTableVerticalScroll';

@Directive({
  selector: '[auiTableScrollShadow]',
})
export class TableScrollShadowDirective implements AfterViewInit, OnDestroy {
  destroy$$ = new Subject<void>();
  constructor(private readonly el: ElementRef<HTMLElement>) {}

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
    merge(
      observeResizeOn(this.containerEl),
      fromEvent(this.containerEl, 'scroll'),
    )
      .pipe(startWith(null as void), takeUntil(this.destroy$$))
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

  ngOnDestroy() {
    this.destroy$$.next();
  }
}
