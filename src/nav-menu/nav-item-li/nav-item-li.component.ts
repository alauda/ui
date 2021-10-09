import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ReplaySubject, combineLatest } from 'rxjs';
import { map, publishReplay, refCount, tap } from 'rxjs/operators';

import { NavItemUlComponent } from '../nav-item-ul/nav-item-ul.component';
import { NavMenuComponent } from '../nav-menu.component';

import { NavItemConfig, NavItemKey } from './../nav-menu.types';

@Component({
  selector: 'aui-nav-item-li',
  templateUrl: './nav-item-li.component.html',
  styleUrls: ['./nav-item-li.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class NavItemLiComponent {
  private _item: NavItemConfig;
  private readonly item$$ = new ReplaySubject<NavItemConfig>(1);

  @Input()
  get item() {
    return this._item;
  }

  set item(val) {
    this._item = val;
    this.item$$.next(val);
  }

  @Input() mainPanelCollapsed = true;

  @Output() itemFocused = new EventEmitter<NavItemKey>();

  @ViewChild(NavItemUlComponent, { static: true }) subUl: NavItemUlComponent;

  isActive$ = combineLatest([this.navMenu.activeKeys$, this.item$$]).pipe(
    map(([activeKeys, item]) => activeKeys?.includes(item.key)),
    tap(isActive => {
      this.snapshot.isActive = isActive;
    }),
    publishReplay(1),
    refCount(),
  );

  isExpanded$ = combineLatest([this.navMenu.expandedKeys$, this.item$$]).pipe(
    map(
      ([expandedKeys, item]) =>
        item.children?.length && expandedKeys?.includes(item.key),
    ),
    tap(isExpanded => {
      this.snapshot.isExpanded = isExpanded;
    }),
    publishReplay(1),
    refCount(),
  );

  isSticked$ = combineLatest([
    this.navMenu.stickedItem$.pipe(map(item => item.key)),
    this.item$$,
  ]).pipe(
    map(([stickedKey, item]) => this.depth === 0 && stickedKey === item.key),
    publishReplay(1),
    refCount(),
  );

  snapshot = {
    isActive: false,
    isExpanded: false,
  };

  hovered = false;
  popMenusDisplayed = false;

  get depth() {
    const path = this.navMenu.paths.find(
      path => [...path].pop() === this.item.key,
    );
    return path.indexOf(this.item.key);
  }

  get hasSubItem() {
    return !!this.item.children?.length;
  }

  get isLeaf() {
    return this.depth === 1;
  }

  get displayItemContent() {
    return !this.mainPanelCollapsed || this.depth !== 0;
  }

  get isExternal() {
    return this.item.href?.startsWith('http');
  }

  constructor(private readonly navMenu: NavMenuComponent) {}

  handleContentClicked() {
    if (!this.displayItemContent && this.snapshot.isExpanded && !this.isLeaf) {
      return;
    }
    if (
      (this.hasSubItem ||
        (!this.displayItemContent && this.snapshot.isActive)) &&
      !this.isLeaf
    ) {
      this.navMenu.expandedKeyChanged(
        this.snapshot.isExpanded
          ? this.findParentKey(this.item.key)
          : this.item.key,
      );
    } else {
      this.navMenu.activatedKeyChanged(this.item.key);
    }
  }

  handleContentFocused(hover: boolean) {
    this.hovered = hover;
    this.itemFocused.emit(hover ? this.item.key : null);
  }

  private findParentKey(key: string) {
    const path = this.navMenu.paths.find(path => new Set(path).has(key));
    return path.slice(0, path.indexOf(key)).pop();
  }
}
