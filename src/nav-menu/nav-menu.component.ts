import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
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

import { NavGroupConfig, NavItemConfig, NavItemKey } from './nav-menu.types';

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
  @Input() hideMainPanelToggle = true;
  @Input() hideSecondaryPanelToggle = false;
  @Input() theme = 'dark';
  @Input() items: NavItemConfig[];
  @Input() groups: NavGroupConfig[];

  @Output() activatedKeyChange = new EventEmitter<NavItemKey>();
  @Output() mainPanelCollapsedChange = new EventEmitter<boolean>();
  @Output() secondaryPanelCollapsedChange = new EventEmitter<boolean>();

  activeKeys$: Observable<NavItemKey[]>;
  expandedKeys$: Observable<NavItemKey[]>;
  stickedItem$: Observable<NavItemConfig>;
  hasFocusedItem$: Observable<boolean>;

  paths: string[][] = [];

  flatItems: NavItemConfig[] = [];

  ngAfterContentInit() {
    const items =
      this.items ||
      this.groups.reduce((prev, cur) => [...prev, ...cur.items], []);
    this.flatItems = this.flattenNav(items);
    this.paths = this.getPaths(items);
    this.activeKeys$ = this.activatedKey$$.pipe(
      map(key => this.findPathByLastKey(key)),
      publishReplay(1),
      refCount(),
    );
    this.expandedKeys$ = merge(this.activatedKey$$, this.expandedKey$$).pipe(
      map((key: NavItemKey) => this.findPathByLastKey(key)),
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
        switchMap((key: NavItemKey) => {
          const stickedItem = this.flatItems.find(item => item.key === key);
          return stickedItem?.subItems.length > 0
            ? of(stickedItem)
            : this.expandedKeys$.pipe(
                map(keys => keys[0]),
                map(expandedKey =>
                  this.flatItems.find(item => item.key === expandedKey),
                ),
              );
        }),
        filter(item => !!item),
        distinctUntilKeyChanged('key'),
        publishReplay(1),
        refCount(),
      );
    this.hasFocusedItem$ = combineLatest([
      this.focusedItemKey$$.pipe(distinctUntilChanged()),
      this.secondaryPanelHover$$,
    ]).pipe(
      map(([key, hover]: [NavItemKey, boolean]) => {
        const focusedItem = this.flatItems.find(item => item.key === key);
        return focusedItem?.subItems.length > 0 || hover;
      }),
      debounceTime(0),
    );
  }

  private flattenNav(items: NavItemConfig[]): NavItemConfig[] {
    if (!items?.length) {
      return [];
    }
    return items.reduce(
      (prev, cur) => [...prev, ...this.flattenNav(cur.children)],
      items,
    );
  }

  private findPathByLastKey(key: NavItemKey) {
    return this.paths.find(path => [...path].pop() === key);
  }

  private getPaths(items: NavItemConfig[], parent?: string[]): string[][] {
    if (!items?.length) {
      return [];
    }
    const pre = parent ? [...parent] : [];
    return items.reduce(
      (prev, cur) => [
        ...prev,
        ...this.getPaths(cur.children, [...pre, cur.key]),
      ],
      items.map(item => [...pre, item.key]),
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
}
