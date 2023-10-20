import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  EMPTY,
  Subject,
  combineLatest,
  fromEvent,
  of,
  debounceTime,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import { buildBem, isTemplateRef, last } from '../utils';

import { AnchorDirectiveChild } from './anchor.directive';
import { AnchorItem, AnchorTreeItem } from './types';
import { getAnchorTreeItems } from './utils';

const bem = buildBem('aui-anchor');

@Component({
  selector: 'aui-anchor-tree',
  templateUrl: 'anchor-tree.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, NgIf, NgTemplateOutlet],
})
export class AnchorTreeComponent
  extends AnchorDirectiveChild
  implements OnDestroy
{
  @Input()
  set treeItems(treeItems) {
    this._treeItems = treeItems;
    this.watchLabelsChange();
  }

  get treeItems() {
    return this._treeItems;
  }

  private _treeItems: AnchorTreeItem[];

  @Input()
  activeId: string;

  @Output()
  activeIdChange = new EventEmitter<string>();

  bem = bem;

  isTemplateRef = isTemplateRef;

  private readonly depose$$ = new Subject<void>();

  watchLabelsChange() {
    this.depose$$.next();
    const cdr = this.injector.get(ChangeDetectorRef);
    // FIXME: Is there any better way to achieve this?
    combineLatest(
      this.treeItems.map(({ labelChange }) => labelChange).filter(Boolean),
    )
      .pipe(debounceTime(0), takeUntil(this.depose$$))
      .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this.depose$$.next();
    this.depose$$.complete();
  }

  isActive(item: AnchorTreeItem): boolean {
    return (
      item.id === this.activeId ||
      item.children?.some(subItem => this.isActive(subItem))
    );
  }

  onItemClick(e: Event, item: AnchorTreeItem) {
    e.preventDefault();

    if (this.parent.injectId) {
      const selector = '#' + item.id;

      if (location.hash === selector) {
        return;
      }

      history.pushState(
        null,
        null,
        location.pathname + location.search + selector,
      );
    }

    item.target.scrollIntoView({ behavior: 'smooth' });

    this.activeIdChange.emit(item.id);
  }

  trackById(_index: number, item: AnchorTreeItem) {
    return item.id;
  }
}

@Component({
  selector: 'aui-anchor',
  templateUrl: 'anchor.component.html',
  styleUrls: ['anchor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AnchorTreeComponent],
})
export class AnchorComponent
  extends AnchorDirectiveChild
  implements AfterViewInit, OnDestroy
{
  @Input()
  get items() {
    return this._items;
  }

  set items(items) {
    this._items = items;
    this.treeItems = getAnchorTreeItems(items);
    const anchorId =
      (this.parent.injectId && location.hash.slice(1)) || this.activeId;
    const activeItem =
      (anchorId && items.find(({ id }) => id === anchorId)) || items[0];
    if (activeItem) {
      if (this.parent.injectId && this.parent.scrollableEl !== window) {
        activeItem.target.scrollIntoView();
      }
      this.activeId = activeItem.id;
    }
  }

  private _items: AnchorItem[];

  @Input()
  treeItems: AnchorTreeItem[];

  @Input()
  activeId: string;

  bem = bem;

  private readonly destroy$$ = new Subject<void>();

  constructor(
    protected override injector: Injector,
    private readonly cdr: ChangeDetectorRef,
  ) {
    super(injector);
  }

  ngAfterViewInit() {
    const { injectId, containerEl, scrollableEl } = this.parent;
    const pageContentEl = containerEl.closest('.aui-page__content');
    const paddingTop = pageContentEl
      ? +getComputedStyle(pageContentEl).paddingTop.slice(0, -2)
      : 0;
    fromEvent(scrollableEl, 'scroll')
      .pipe(
        debounceTime(100),
        switchMap(() => {
          const { scrollTop } =
            scrollableEl === window
              ? document.documentElement
              : (scrollableEl as HTMLElement);
          const activeItem =
            this.items.find(
              ({ target }) =>
                target.offsetTop +
                  target.offsetHeight / 2 +
                  ((scrollableEl === window &&
                    (target.offsetParent as HTMLElement)?.offsetTop) ||
                    0) >
                scrollTop + paddingTop,
            ) || last(this.items);
          return activeItem ? of(activeItem) : EMPTY;
        }),
        tap(activeItem => {
          if (activeItem.id) {
            this.activeId = activeItem.id;
            this.cdr.markForCheck();
          }
        }),
        debounceTime(100),
        tap(activeItem => {
          if (injectId && activeItem.id) {
            history.replaceState(
              null,
              null,
              location.pathname + location.search + '#' + activeItem.id,
            );
          }
        }),
        takeUntil(this.destroy$$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
