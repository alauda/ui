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
import { NavItemComponent } from '../nav-item/nav-item.component';
import { NavMenuComponent } from '../nav-menu.component';
import { NavItemKey } from '../nav-menu.types';

@Component({
  selector: 'aui-nav-item-li',
  templateUrl: './nav-item-li.component.html',
  styleUrls: ['./nav-item-li.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class NavItemLiComponent {
  private _item: NavItemComponent;
  private readonly item$$ = new ReplaySubject<NavItemComponent>(1);

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
    map(([activeKeys, item]) => activeKeys.includes(item.key)),
    tap(isActive => {
      this.snapshot.isActive = isActive;
    }),
    publishReplay(1),
    refCount(),
  );

  isExpanded$ = combineLatest([this.navMenu.expandedKeys$, this.item$$]).pipe(
    map(
      ([expandedKeys, item]) =>
        item.subItems.length && expandedKeys.includes(item.key),
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
    map(([stickedKey, item]) => item.depth === 0 && stickedKey === item.key),
    publishReplay(1),
    refCount(),
  );

  snapshot = {
    isActive: false,
    isExpanded: false,
  };

  get hasSubItem() {
    return !!this.item.subItems.length;
  }

  get displayItemContent() {
    return !this.mainPanelCollapsed || this.item.depth !== 0;
  }

  constructor(private readonly navMenu: NavMenuComponent) {}

  handleContentClicked() {
    if (!this.displayItemContent && this.snapshot.isExpanded) {
      return;
    }
    if (
      this.hasSubItem ||
      (!this.displayItemContent && this.snapshot.isActive)
    ) {
      this.navMenu.expandedKeyChanged(
        this.snapshot.isExpanded ? this.item.parentItem?.key : this.item.key,
      );
    } else {
      this.navMenu.activatedKeyChanged(this.item.key);
    }
  }

  handleContentFocused(hover: boolean) {
    this.itemFocused.emit(hover ? this.item.key : null);
  }
}
