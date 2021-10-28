/* eslint-disable no-prototype-builtins */
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, Subscription, merge } from 'rxjs';

import { Bem, buildBem, coerceNumber } from '../utils';

import { TabHeaderAddonDirective, TabTitleDirective } from './tab-directives';
import { TabHeaderComponent } from './tab-header.component';
import { TabComponent } from './tab.component';
import { TabSize, TabType } from './tabs.types';

/** A simple change event emitted on focus or selection changes. */
export class TabChangeEvent {
  /** Index of the currently-selected tab. */
  index: number;
  /** Reference to the currently-selected tab. */
  tab: TabComponent;
}

@Component({
  selector: 'aui-tab-group',
  exportAs: 'auiTabGroup',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class TabGroupComponent
  implements OnChanges, AfterContentChecked, AfterContentInit, OnDestroy {
  bem: Bem = buildBem('aui-tab-group');

  @ContentChildren(TabComponent)
  _tabs: QueryList<TabComponent>;

  @ContentChild(TabHeaderAddonDirective, { static: false })
  _headerAddon: TabHeaderAddonDirective;

  @ViewChild(TabHeaderComponent, { static: false })
  _tabHeader: TabHeaderComponent;

  @ContentChild(TabTitleDirective, { static: false })
  _tabTitle: TabTitleDirective;

  /** The tab index that should be selected after the content has been checked. */
  private _indexToSelect: number | null = 0;

  /** Subscription to tabs being added/removed. */
  private _tabsSubscription = Subscription.EMPTY;

  /** Subscription to changes in the tab labels. */
  private _tabLabelSubscription = Subscription.EMPTY;

  private _type: TabType = TabType.Line;
  private _size: TabSize = TabSize.Medium;

  /** true lazy mode for template ref children */
  private _lazy: boolean;

  private _previousHeaderAddon: TabHeaderAddonDirective;

  /** Emits whenever the type changes */
  readonly _typeChange = new Subject<void>();

  /** Emits whenever the size changes */
  readonly _sizeChange = new Subject<void>();

  /** The index of the active tab. */
  @Input()
  get selectedIndex(): number | null {
    return this._selectedIndex;
  }

  set selectedIndex(value: number | null) {
    this._indexToSelect = coerceNumber(value, null);
    this._changeActivatedTabs();
  }

  private _selectedIndex: number | null = null;

  @Input()
  get type() {
    return this._type;
  }

  set type(type: TabType) {
    this._type = type;
  }

  @Input()
  title: string | TemplateRef<unknown>;

  @Input()
  get size() {
    return this._size;
  }

  set size(val) {
    if (!val || this._size === val) {
      return;
    }
    this._size = val;
  }

  @Input()
  get lazy() {
    return this._lazy;
  }

  set lazy(lazy: boolean) {
    if (this._lazy === lazy) {
      return;
    }
    this._lazy = lazy;
    if (lazy) {
      this._changeActivatedTabs();
    } else {
      this.activatedTabs.length = 0;
    }
  }

  /** Output to enable support for two-way binding on `[(selectedIndex)]` */
  @Output()
  readonly selectedIndexChange = new EventEmitter<number>();

  /** Event emitted when the tab selection has changed. */
  @Output()
  readonly selectedTabChange = new EventEmitter<TabChangeEvent>(true);

  /** Event emitted when focus has changed within a tab group. */
  @Output()
  readonly focusChange: EventEmitter<TabChangeEvent> = new EventEmitter<TabChangeEvent>();

  constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

  activatedTabs: TabComponent[] = [];

  get activeTab() {
    return this._tabs.length > 0 && this.selectedIndex !== null
      ? this._tabs.toArray()[this.selectedIndex]
      : null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('type')) {
      this._typeChange.next();
    }

    if (changes.hasOwnProperty('size')) {
      this._sizeChange.next();
    }
  }

  /**
   * After the content is checked, this component knows what tabs have been defined
   * and what the selected index should be. This is where we can know exactly what position
   * each tab should be in according to the new selected index.
   */
  ngAfterContentChecked(): void {
    // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
    // the amount of tabs changes before the actual change detection runs.
    const indexToSelect = (this._indexToSelect = this._clampTabIndex(
      this._indexToSelect,
    ));

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._selectedIndex !== indexToSelect && this._selectedIndex != null) {
      this._changeActivatedTabs();
      const tabChangeEvent = this._createChangeEvent(indexToSelect);
      this.selectedTabChange.emit(tabChangeEvent);
      // Emitting this value after change detection has run
      // since the checked content may contain this variable'
      Promise.resolve().then(() =>
        this.selectedIndexChange.emit(indexToSelect),
      );
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this._tabs.forEach((tab: TabComponent, index: number) => {
      tab.position = index - indexToSelect;
      tab.tabContext.isActive = index === indexToSelect;
      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this._selectedIndex != null && tab.position === 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });

    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this._changeDetectorRef.markForCheck();
    }

    if (this._previousHeaderAddon !== this._headerAddon) {
      this._previousHeaderAddon = this._headerAddon;
      this._changeDetectorRef.markForCheck();
    }
  }

  ngAfterContentInit() {
    this._changeActivatedTabs();
    this._subscribeToTabLabels();
    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this._tabsSubscription = this._tabs.changes.subscribe(() => {
      const tabs = this._tabs.toArray();
      if (this._lazy) {
        this.activatedTabs = this.activatedTabs.filter(tab =>
          tabs.includes(tab),
        );
      }
      const indexToSelect = this._clampTabIndex(this._indexToSelect);
      // Maintain the previously-selected tab if a new tab is added or removed and there is no
      // explicit change that selects a different tab.
      if (indexToSelect === this._selectedIndex) {
        for (const [i, tab] of tabs.entries()) {
          if (tab.tabContext.isActive) {
            // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
            // adding a tab within the `selectedIndexChange` event.
            this._indexToSelect = this._selectedIndex = i;
            break;
          }
        }
      }
      this._changeActivatedTabs();
      this._subscribeToTabLabels();
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this._tabsSubscription.unsubscribe();
    this._tabLabelSubscription.unsubscribe();

    this._typeChange.complete();
    this._sizeChange.complete();
  }

  /** Handle click events, setting new selected index if appropriate. */
  _handleClick(tab: TabComponent, idx: number) {
    if (!tab.disabled) {
      this.selectedIndex = this._tabHeader.focusIndex = idx;
    }
  }

  _focusChanged(index: number) {
    this.focusChange.emit(this._createChangeEvent(index));
  }

  /** Re-aligns the ink bar to the selected tab element. */
  realignActiveIndicator() {
    if (this._tabHeader) {
      this._tabHeader._alignActiveIndicatorToSelectedTab();
    }
  }

  private _changeActivatedTabs() {
    if (
      !this._lazy ||
      !this._tabs ||
      this._indexToSelect < 0 ||
      this._indexToSelect >= this._tabs.length
    ) {
      return;
    }
    const tab = this._tabs.find((_, index) => index === this._indexToSelect);
    if (tab && !this.activatedTabs.includes(tab)) {
      this.activatedTabs.push(tab);
    }
  }

  /** Clamps the given index to the bounds of 0 and the tabs length. */
  private _clampTabIndex(index: number | null): number {
    // Note the `|| 0`, which ensures that values like NaN can't get through
    // and which would otherwise throw the component into an infinite loop
    // (since Math.max(NaN, 0) === NaN).
    return Math.min(this._tabs.length - 1, Math.max(index || 0, 0));
  }

  private _createChangeEvent(index: number): TabChangeEvent {
    const event = new TabChangeEvent();
    event.index = index;
    if (this._tabs?.length > 0) {
      event.tab = this._tabs.toArray()[index];
    }
    return event;
  }

  /**
   * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
   * on the Tab component, whereas the data binding is inside the TabGroup. In order for the
   * binding to be updated, we need to subscribe to changes in it and trigger change detection
   * manually.
   */
  private _subscribeToTabLabels() {
    if (this._tabLabelSubscription) {
      this._tabLabelSubscription.unsubscribe();
    }
    this._tabLabelSubscription = merge(
      ...this._tabs.map(tab => tab._stateChanges),
      this._typeChange,
      this._sizeChange,
    ).subscribe(() => {
      this.realignActiveIndicator();
      this._changeDetectorRef.markForCheck();
    });
  }

  /** Retrieves the tabindex for the tab. */
  _getTabIndex(tab: TabComponent, idx: number): number | null {
    if (tab.disabled) {
      return null;
    }
    return this.selectedIndex === idx ? 0 : -1;
  }
}
