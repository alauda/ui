import { CdkScrollable } from '@angular/cdk/overlay';
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
} from 'rxjs';

type TargetType = Element | Window | string;

@Component({
  selector: 'aui-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
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

  isDisplayed$ = combineLatest([
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
    distinctUntilChanged(),
  );

  getTargetScrollTop(target: Element | Window) {
    if (target === window) {
      return document.documentElement.scrollTop;
    }
    return (target as HTMLElement).scrollTop;
  }

  handleClick(event: Event) {
    this._scrollTarget.scrollTo({ top: 0, behavior: 'smooth' });
    this.click.emit(event);
  }

  getTarget(target: TargetType): Element | Window {
    const scrollTarget =
      (typeof target === 'string' && document.querySelector(target)) ||
      this.cdkScrollable?.getElementRef().nativeElement ||
      window;
    this._scrollTarget = scrollTarget;
    return scrollTarget;
  }
}
