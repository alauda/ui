import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  combineLatest,
  merge,
  of,
} from 'rxjs';
import {
  bufferCount,
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { NavItemGroupComponent } from './nav-item-group/nav-item-group.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavItemKey } from './nav-menu.types';

@Component({
  selector: 'aui-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class NavMenuComponent implements AfterContentInit {
  private _activatedKey: NavItemKey;
  private readonly activatedKey$$ = new ReplaySubject<NavItemKey>(1);
  private readonly expandedKey$$ = new ReplaySubject<NavItemKey>(1);
  private readonly focusedItemKey$$ = new BehaviorSubject<NavItemKey>(null);
  private readonly secondaryPanelHover$$ = new BehaviorSubject<boolean>(false);

  @Input()
  get activatedKey() {
    return this._activatedKey;
  }

  set activatedKey(val) {
    this._activatedKey = val;
    this.activatedKey$$.next(val);
  }

  @Input() mainPanelCollapsed = false;
  @Input() secondaryPanelCollapsed = false;
  @Input() hideMainPanelToggle = false;
  @Input() hideSecondaryPanelToggle = false;
  @Input() theme = 'dark';

  @Output() activatedKeyChange = new EventEmitter<NavItemKey>();
  @Output() mainPanelCollapsedChange = new EventEmitter<boolean>();
  @Output() secondaryPanelCollapsedChange = new EventEmitter<boolean>();

  @ContentChildren(NavItemComponent)
  private readonly items: QueryList<NavItemComponent>;

  @ContentChildren(NavItemGroupComponent)
  private readonly groups: QueryList<NavItemGroupComponent>;

  @ContentChildren(NavItemComponent, { descendants: true })
  flatItems: QueryList<NavItemComponent>;

  items$: Observable<NavItemComponent[]>;
  groups$: Observable<NavItemGroupComponent[]>;
  activeKeys$: Observable<NavItemKey[]>;
  expandedKeys$: Observable<NavItemKey[]>;
  stickedItem$: Observable<NavItemComponent>;
  hasFocusedItem$: Observable<boolean>;

  ngAfterContentInit() {
    this.items$ = this.items.changes.pipe(
      startWith(this.items),
      map((list: QueryList<NavItemComponent>) => list.toArray()),
      publishReplay(1),
      refCount(),
    );
    this.groups$ = this.groups.changes.pipe(
      startWith(this.groups),
      map((list: QueryList<NavItemGroupComponent>) => list.toArray()),
      publishReplay(1),
      refCount(),
    );
    this.activeKeys$ = combineLatest([
      this.activatedKey$$,
      this.flatItems.changes.pipe(startWith(this.flatItems)),
    ]).pipe(
      map(([key, items]: [NavItemKey, QueryList<NavItemComponent>]) =>
        items.find(item => item.key === key),
      ),
      map(item => this.getItemPath(item)),
      publishReplay(1),
      refCount(),
    );

    this.expandedKeys$ = combineLatest([
      merge(this.activatedKey$$, this.expandedKey$$),
      this.flatItems.changes.pipe(startWith(this.flatItems)),
    ]).pipe(
      map(([key, items]: [NavItemKey, QueryList<NavItemComponent>]) =>
        items.find(item => item.key === key),
      ),
      map(item => this.getItemPath(item)),
      publishReplay(1),
      refCount(),
    );

    this.stickedItem$ = this.focusedItemKey$$
      .pipe(
        bufferCount(2, 1),
        startWith<NavItemKey[]>([null, null]),
        debounceTime(0),
        switchMap(([prevKey, currKey]) =>
          currKey
            ? of(currKey)
            : this.secondaryPanelHover$$.pipe(
                debounceTime(0),
                switchMap(hover => (hover ? of(prevKey) : of(null))),
              ),
        ),
      )
      .pipe(
        switchMap(key =>
          combineLatest([
            of(key),
            this.flatItems.changes.pipe(startWith(this.flatItems)),
          ]),
        ),
        switchMap(([key, items]: [NavItemKey, QueryList<NavItemComponent>]) => {
          const stickedItem = items.find(item => item.key === key);
          return stickedItem?.subItems.length > 0
            ? of(stickedItem)
            : this.expandedKeys$.pipe(
                map(keys => keys[0]),
                map(expandedKey =>
                  items.find(item => item.key === expandedKey),
                ),
              );
        }),
        filter(item => !!item),
        distinctUntilKeyChanged('key'),
        publishReplay(1),
        refCount(),
      );

    this.hasFocusedItem$ = combineLatest([
      this.flatItems.changes.pipe(startWith(this.flatItems)),
      this.focusedItemKey$$.pipe(distinctUntilChanged()),
      this.secondaryPanelHover$$,
    ]).pipe(
      map(
        ([items, key, hover]: [
          QueryList<NavItemComponent>,
          NavItemKey,
          boolean,
        ]) => {
          const focusedItem = items.find(item => item.key === key);
          return focusedItem?.subItems.length > 0 || hover;
        },
      ),
      debounceTime(0),
    );
  }

  handleMainPanelExpandButtonClicked() {
    this.mainPanelCollapsedChange.emit(!this.mainPanelCollapsed);
  }

  handleSecondaryPanelExpandButtonClicked() {
    this.secondaryPanelCollapsedChange.emit(!this.secondaryPanelCollapsed);
  }

  handleFocusedItemChanged(key: NavItemKey) {
    this.focusedItemKey$$.next(key);
  }

  handleSecondaryPanelHover(hover: boolean) {
    this.secondaryPanelHover$$.next(hover);
    if (!hover) {
      this.focusedItemKey$$.next(null);
    }
  }

  activatedKeyChanged(key: NavItemKey) {
    this.activatedKeyChange.emit(key);
  }

  expandedKeyChanged(key: NavItemKey) {
    this.expandedKey$$.next(key);
  }

  private getItemPath(item: NavItemComponent): NavItemKey[] {
    if (!item) {
      return [];
    }
    return item.parentItem
      ? [...this.getItemPath(item.parentItem), item.key]
      : [item.key];
  }
}
