import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

const CLASS_PREFIX = 'aui-table';
const WRAPPER_CLASS = `${CLASS_PREFIX}__scroll-wrapper`;
const HAS_SCROLL_CLASS = `${WRAPPER_CLASS}--has-scroll`;
const SCROLLING_CLASS = `${WRAPPER_CLASS}--scrolling`;
const SCROLL_BEFORE_END_CLASS = `${WRAPPER_CLASS}--before-end`;

@Directive({
  selector: '[auiTableScrollWrapper]',
  host: {
    class: `${WRAPPER_CLASS} ${SCROLL_BEFORE_END_CLASS}`,
  },
})
export class TableScrollWrapperDirective
  implements AfterViewChecked, AfterViewInit, OnDestroy {
  scrollDis = 0;
  destroy$$ = new Subject<void>();
  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngAfterViewChecked() {
    this.scrollDis =
      this.el.nativeElement.scrollWidth - this.el.nativeElement.offsetWidth;
    if (this.scrollDis > 0) {
      this.el.nativeElement.classList.add(HAS_SCROLL_CLASS);
    }
  }

  ngAfterViewInit() {
    fromEvent(this.el.nativeElement, 'scroll')
      .pipe(debounceTime(100), takeUntil(this.destroy$$))
      .subscribe(() => {
        const scrollLeft = this.el.nativeElement.scrollLeft;
        if (scrollLeft > 0) {
          this.el.nativeElement.classList.add(SCROLLING_CLASS);
        } else {
          this.el.nativeElement.classList.remove(SCROLLING_CLASS);
        }
        if (scrollLeft === this.scrollDis) {
          this.el.nativeElement.classList.remove(SCROLL_BEFORE_END_CLASS);
        } else {
          this.el.nativeElement.classList.add(SCROLL_BEFORE_END_CLASS);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
