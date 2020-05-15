import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  EMPTY,
  Subject,
  Subscription,
  animationFrameScheduler,
  of,
} from 'rxjs';
import {
  debounceTime,
  endWith,
  map,
  observeOn,
  repeat,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs/operators';

import { TocContentDirective } from './toc-content.directive';

@Directive({
  selector: '[auiTocContainer]',
  exportAs: 'auiTocContainer',
})
export class TocContainerDirective implements AfterContentInit, OnDestroy {
  @Output()
  activedChange = new EventEmitter<string>();

  private _contents: TocContentDirective[] = [];
  private readonly _scrollTop$ = new Subject<number>();
  private readonly _scrollTo$ = new Subject<string>();
  private readonly _onDestroy$ = new Subject<void>();
  private readonly _subs: Subscription[] = [];
  private _nativeElement: HTMLElement;

  get scrollTop(): number {
    return this._nativeElement.scrollTop || 0;
  }

  set scrollTop(value: number) {
    this._nativeElement.scrollTop = value;
  }

  get isScrollEnd() {
    return (
      this._nativeElement.scrollHeight - this._nativeElement.scrollTop ===
      this._nativeElement.clientHeight
    );
  }

  constructor(elementRef: ElementRef, private readonly cdr: ChangeDetectorRef) {
    this._nativeElement = elementRef.nativeElement;
  }

  getOffsetTop(element: HTMLElement): number {
    if (element.parentElement === this._nativeElement) {
      return element.offsetTop;
    }
    return element.offsetTop + this.getOffsetTop(element.parentElement);
  }

  private getMinContent(scrollTop: number) {
    return (minContent: TocContentDirective, content: TocContentDirective) => {
      if (
        Math.abs(scrollTop - this.getOffsetTop(content.nativeElement)) <
        Math.abs(scrollTop - this.getOffsetTop(minContent.nativeElement))
      ) {
        minContent = content;
      }
      return minContent;
    };
  }

  private getMaxContent(
    maxContent: TocContentDirective,
    content: TocContentDirective,
  ) {
    if (
      this.getOffsetTop(content.nativeElement) >
      this.getOffsetTop(maxContent.nativeElement)
    ) {
      maxContent = content;
    }
    return maxContent;
  }

  @HostListener('scroll')
  onScroll() {
    this._scrollTop$.next(this.scrollTop);
  }

  ngAfterContentInit() {
    const actived$ = this._scrollTop$
      .pipe(
        startWith(this.scrollTop),
        debounceTime(200),
        map(scrollTop => {
          return this._contents.reduce(
            this.isScrollEnd
              ? this.getMaxContent.bind(this)
              : this.getMinContent(scrollTop),
          );
        }),
        map(actived => actived.auiTocContent),
      )
      .pipe(
        tap(actived => {
          this._contents.forEach(content => {
            content.active = actived === content.auiTocContent;
          });
          this.cdr.detectChanges();
        }),
      );

    const scrollTween$ = this._scrollTo$.pipe(
      switchMap(name => {
        const target = this._contents.find(
          content => content.auiTocContent === name,
        );

        if (!target) {
          return EMPTY;
        }
        const destination = this.getOffsetTop(target.nativeElement);

        const start = performance.now();
        const source = this.scrollTop;
        const duration = 500;

        return of(0).pipe(
          observeOn(animationFrameScheduler),
          repeat(),
          map(() => (performance.now() - start) / duration),
          takeWhile(t => t < 1),
          endWith(1),
          map(t => t * t * t),
          map(t => source * (1 - t) + destination * t),
        );
      }),
      takeUntil(this._onDestroy$),
    );

    this._subs.push(actived$.subscribe(this.activedChange));
    this._subs.push(
      scrollTween$.subscribe(tweenValue => {
        this.scrollTop = tweenValue;
      }),
    );
  }

  ngOnDestroy() {
    this._subs.forEach(sub => sub.unsubscribe());
    this._onDestroy$.next();
  }

  scrollTo(content: string) {
    if (content.includes('.')) {
      this._scrollTo$.next(content.split('.')[0]);
    } else {
      this._scrollTo$.next(content);
    }
  }

  registerContent(tocContent: TocContentDirective) {
    this._contents = [...this._contents, tocContent];
  }

  deregisterContent(tocContent: TocContentDirective) {
    this._contents = this._contents.filter(
      content => content.auiTocContent !== tocContent.auiTocContent,
    );
  }
}
