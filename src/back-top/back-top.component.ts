import { CdkScrollable } from '@angular/cdk/overlay';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  distinctUntilChanged,
  map,
  switchMap,
  throttleTime,
  startWith,
} from 'rxjs';

import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

type TargetType = Element | Window | string;

@Component({
    selector: 'aui-back-top',
    templateUrl: './back-top.component.html',
    styleUrls: ['./back-top.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    imports: [ButtonComponent, IconComponent, AsyncPipe]
})
export class BackTopComponent {
  @Input()
  set visibilityHeight(val: number) {
    this._visibilityHeight = val;
    this.visibilityHeight$$.next(val);
  }

  get visibilityHeight() {
    return this._visibilityHeight;
  }

  @Input()
  position: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  } = { right: '12px', bottom: '12px' };

  @Input()
  set target(val: TargetType) {
    this._target = val;
    this.target$$.next(val);
  }

  get target() {
    return this._target;
  }

  @Output()
  click = new EventEmitter<Event>();

  private _visibilityHeight = 400;
  private readonly target$$ = new BehaviorSubject<TargetType>(this.target);
  private readonly visibilityHeight$$ = new BehaviorSubject<number>(
    this.visibilityHeight,
  );

  private _target: TargetType;
  private _scrollTarget: Element | Window;

  constructor(@Optional() private readonly cdkScrollable: CdkScrollable) {}

  display$ = combineLatest([
    this.target$$.asObservable().pipe(
      map(target => this.getTarget(target)),
      switchMap(target =>
        fromEvent(target, 'scroll').pipe(
          // use default scheduler
          throttleTime(50, undefined, { leading: true, trailing: true }),
          map(() => this.getTargetScrollTop(target)),
        ),
      ),
    ),
    this.visibilityHeight$$,
  ]).pipe(
    map(([scrollTop, visibilityHeight]) => scrollTop >= visibilityHeight),
    map(visible => (visible ? 'flex' : 'none')),
    startWith('none'),
    distinctUntilChanged(),
  );

  getTargetScrollTop(target: Element | Window) {
    if (target === window) {
      return document.documentElement.scrollTop;
    }
    return (target as HTMLElement).scrollTop;
  }

  handleClick(event: Event) {
    this.scrollToTop(200);
    this.click.emit(event);
  }

  scrollToTop(duration: number) {
    const startHeight = this.getTargetScrollTop(this._scrollTarget);
    let startTime: number;

    const scrollStep = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const scrollHeight = Math.max(
        startHeight - ((timestamp - startTime) / duration) * startHeight,
        0,
      );

      this._scrollTarget.scrollTo(0, scrollHeight);
      if (scrollHeight) {
        requestAnimationFrame(scrollStep);
      }
    };
    requestAnimationFrame(scrollStep);
  }

  getTarget(target: TargetType): Element | Window {
    const scrollTarget =
      (typeof target === 'string' ? document.querySelector(target) : target) ||
      this.cdkScrollable?.getElementRef().nativeElement ||
      window;
    this._scrollTarget = scrollTarget;
    return scrollTarget;
  }
}
