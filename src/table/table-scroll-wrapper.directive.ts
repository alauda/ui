import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subject, fromEvent, merge } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { observeResizeOn } from '../utils';

const CLASS_PREFIX = 'aui-table';
const WRAPPER_CLASS = `${CLASS_PREFIX}__scroll-wrapper`;
const HAS_SCROLL_CLASS = `${WRAPPER_CLASS}--has-scroll`;
const SCROLLING_CLASS = `${WRAPPER_CLASS}--scrolling`;
const SCROLL_BEFORE_END_CLASS = `${WRAPPER_CLASS}--before-end`;

@Directive({
  selector: '[auiTableScrollWrapper]',
  host: {
    class: `${SCROLL_BEFORE_END_CLASS}`,
  },
})
export class TableScrollWrapperDirective implements AfterViewInit, OnDestroy {
  destroy$$ = new Subject<void>();
  constructor(private readonly el: ElementRef<HTMLElement>) {}

  @HostBinding(`class.${WRAPPER_CLASS}`)
  @Input('auiTableScrollWrapper')
  auiTableScrollWrapper: boolean;

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
          scrollLeft !== scrollDis,
          SCROLL_BEFORE_END_CLASS,
        );
      });
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
