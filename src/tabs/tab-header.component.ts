import { FocusKeyManager } from '@angular/cdk/a11y';
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { NgClass, NgIf } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { IconComponent } from '../icon/icon.component';
import { Bem, buildBem } from '../utils';

import {
  TabHeaderAddonDirective,
  TabLabelWrapperDirective,
  TabTitleDirective,
} from './tab-body.component';
import { TabHeaderActiveIndicatorComponent } from './tab-header-active-indicator.component';
import { TabSize, TabType } from './tabs.types';

/**
 * The directions that scrolling can go in when the header's tabs exceed the header width. 'After'
 * will scroll the header towards the end of the tabs list and 'before' will scroll towards the
 * beginning of the list.
 */
export type ScrollDirection = 'after' | 'before';
/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 */
const EXAGGERATED_OVERSCROLL = 60;

@Component({
  selector: 'aui-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    PortalModule,
    IconComponent,
    ObserversModule,
    TabHeaderActiveIndicatorComponent,
  ],
})
export class TabHeaderComponent
  implements OnDestroy, AfterContentChecked, AfterContentInit
{
  bem: Bem = buildBem('aui-tab-header');

  _showAddon = false;

  /** Whether the controls for pagination should be displayed */
  _showPaginationControls = false;

  /** Whether the tab list can be scrolled more towards the end of the tab label list. */
  _disableScrollAfter = true;

  /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
  _disableScrollBefore = true;

  /** Whether the scroll distance has changed and should be applied after the view is checked. */
  private _scrollDistanceChanged: boolean;

  /** Whether the header should scroll to the selected index after the view has been checked. */
  private _selectedIndexChanged = false;

  /** The distance in pixels that the tab labels should be translated to the left. */
  private _scrollDistance = 0;

  private _selectedIndex = 0;

  /** Emits when the component is destroyed. */
  private readonly _destroyed = new Subject<void>();

  /** Used to manage focus between the tabs. */
  private _keyManager: FocusKeyManager<TabLabelWrapperDirective>;

  /**
   * The number of tab labels that are displayed on the header. When this changes, the header
   * should re-evaluate the scroll position.
   */
  private _tabLabelCount: number;

  @Input()
  type: TabType = TabType.Line;

  @Input()
  size: TabSize = TabSize.Medium;

  /** The index of the active tab. */
  @Input()
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  set selectedIndex(value: number) {
    this._selectedIndexChanged = this._selectedIndex !== value;
    this._selectedIndex = value;

    if (this._keyManager) {
      this._keyManager.updateActiveItem(value);
    }
  }

  /** Event emitted when the option is selected. */
  @Output()
  readonly selectFocusedIndex = new EventEmitter<number>();

  /** Event emitted when a label is focused. */
  @Output()
  readonly indexFocused = new EventEmitter<number>();

  @ContentChild(TabHeaderAddonDirective, { static: false })
  _headerAddon: TabHeaderAddonDirective;

  @ContentChild(TabTitleDirective, { static: false })
  _title: TabTitleDirective;

  @ContentChildren(TabLabelWrapperDirective)
  /**
   * workaround for @link https://github.com/microsoft/TypeScript/pull/42425
   */
  _labelWrappers: QueryList<TabLabelWrapperDirective & { disabled?: boolean }>;

  @ViewChild('tabListContainer', { static: true })
  _tabListContainer: ElementRef<HTMLElement>;

  @ViewChild('tabList', { static: true })
  _tabList: ElementRef<HTMLElement>;

  @ViewChild('paginationWrapper', { static: true })
  _paginationWrapper: ElementRef<HTMLElement>;

  @ViewChild(TabHeaderActiveIndicatorComponent, { static: true })
  _activeIndicator: TabHeaderActiveIndicatorComponent;

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  ngAfterContentChecked(): void {
    // If the number of tab labels have changed, check if scrolling should be enabled
    if (this._tabLabelCount !== this._labelWrappers.length) {
      this._updatePagination();
      this._tabLabelCount = this._labelWrappers.length;
      this._changeDetectorRef.markForCheck();
    }

    // If the selected index has changed, scroll to the label and check if the scrolling controls
    // should be disabled.
    if (this._selectedIndexChanged) {
      this._scrollToLabel(this._selectedIndex);
      this._checkScrollingControls();
      this._alignActiveIndicatorToSelectedTab();
      this._selectedIndexChanged = false;
      this._changeDetectorRef.markForCheck();
    }

    // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
    // then translate the header to reflect this.
    if (this._scrollDistanceChanged) {
      this._updateTabScrollPosition();
      this._scrollDistanceChanged = false;
      this._changeDetectorRef.markForCheck();
    }

    if (this._showAddon !== !!this._headerAddon) {
      this._showAddon = !!this._headerAddon;
      this._updatePagination();
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Aligns the ink bar to the selected tab on load.
   */
  ngAfterContentInit() {
    const resize = this._viewportRuler.change(150);
    const realign = () => {
      this._updatePagination();
      this._alignActiveIndicatorToSelectedTab();
      requestAnimationFrame(() => {
        this._scrollToLabel(this._selectedIndex);
      });
    };

    this._keyManager = new FocusKeyManager(this._labelWrappers)
      .withHorizontalOrientation('ltr')
      .withWrap();
    this._keyManager.updateActiveItem(0);

    // Defer the first call in order to allow for slower browsers to lay out the elements.
    // This helps in cases where the user lands directly on a page with paginated tabs.
    requestAnimationFrame(realign);

    // On window resize, realign the ink bar and update the orientation of
    // the key manager if the direction has changed.
    resize.pipe(takeUntil(this._destroyed)).subscribe(() => {
      realign();
    });

    // If there is a change in the focus key manager we need to emit the `indexFocused`
    // event in order to provide a public event that notifies about focus changes. Also we realign
    // the tabs container by scrolling the new focused tab into the visible section.
    this._keyManager.change
      .pipe(takeUntil(this._destroyed))
      .subscribe(newFocusIndex => {
        this.indexFocused.emit(newFocusIndex);
        this._setTabFocus(newFocusIndex);
      });
  }

  /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
  get scrollDistance(): number {
    return this._scrollDistance;
  }

  set scrollDistance(v: number) {
    this._scrollDistance = Math.max(
      0,
      Math.min(this._getMaxScrollDistance(), v),
    );
    // Mark that the scroll distance has changed so that after the view is checked, the CSS
    // transformation can move the header.
    this._scrollDistanceChanged = true;
    this._checkScrollingControls();
  }

  /** Tracks which element has focus; used for keyboard navigation */
  get focusIndex(): number {
    return this._keyManager ? this._keyManager.activeItemIndex : 0;
  }

  /** When the focus index is set, we must manually send focus to the correct label */
  set focusIndex(value: number) {
    if (
      !this._isValidIndex(value) ||
      this.focusIndex === value ||
      !this._keyManager
    ) {
      return;
    }
    this._keyManager.setActiveItem(value);
  }

  /**
   * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
   * providing a valid index and return true.
   */
  _isValidIndex(index: number): boolean {
    if (!this._labelWrappers) {
      return true;
    }
    const tab = this._labelWrappers
      ? this._labelWrappers.toArray()[index]
      : null;
    return !!tab && !tab.disabled;
  }

  _handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Home': {
        this._keyManager.setFirstItemActive();
        event.preventDefault();
        break;
      }
      case 'End': {
        this._keyManager.setLastItemActive();
        event.preventDefault();
        break;
      }
      case 'Enter':
      case 'Space': {
        this.selectFocusedIndex.emit(this.focusIndex);
        event.preventDefault();
        break;
      }
      default: {
        this._keyManager.onKeydown(event);
      }
    }
  }

  /**
   * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
   * scrolling is enabled.
   */
  _setTabFocus(tabIndex: number) {
    if (this._showPaginationControls) {
      this._scrollToLabel(tabIndex);
    }
    if (this._labelWrappers?.length > 0) {
      this._labelWrappers.toArray()[tabIndex].focus();
      // Do not let the browser manage scrolling to focus the element, this will be handled
      // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
      // should be the full width minus the offset width.
      const containerEl = this._tabListContainer.nativeElement;
      containerEl.scrollLeft = 0;
    }
  }

  /**
   * Moves the tab list such that the desired tab label (marked by index) is moved into view.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _scrollToLabel(labelIndex: number) {
    const selectedLabel = this._labelWrappers
      ? this._labelWrappers.toArray()[labelIndex]
      : null;
    if (!selectedLabel) {
      return;
    }
    // The view length is the visible width of the tab labels.
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    const labelBeforePos = selectedLabel.getOffsetLeft();
    const labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
    const beforeVisiblePos = this.scrollDistance;
    const afterVisiblePos = this.scrollDistance + viewLength;
    if (labelBeforePos < beforeVisiblePos) {
      // Scroll header to move label to the before direction
      this.scrollDistance -=
        beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
    } else if (labelAfterPos > afterVisiblePos) {
      // Scroll header to move label to the after direction
      this.scrollDistance +=
        labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
    }
  }

  /**
   * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
   * the end of the list, respectively). The distance to scroll is computed to be a third of the
   * length of the tab list view window.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _scrollHeader(scrollDir: ScrollDirection) {
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    // Move the scroll distance one-third the length of the tab list's viewport.
    this.scrollDistance += ((scrollDir === 'before' ? -1 : 1) * viewLength) / 3;
  }

  /**
   * Callback for when the MutationObserver detects that the content has changed.
   */
  _onContentChanges() {
    this._updatePagination();
    this._alignActiveIndicatorToSelectedTab();
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Updating the view whether pagination should be enabled or not
   */
  _updatePagination() {
    this._checkPaginationEnabled();
    this._checkScrollingControls();
    this._updateTabScrollPosition();
  }

  /**
   * Evaluate whether the pagination controls should be displayed. If the scroll width of the
   * tab list is wider than the size of the header container, then the pagination controls should
   * be shown.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _checkPaginationEnabled() {
    const isEnabled =
      this._tabList.nativeElement.scrollWidth >
      this._paginationWrapper.nativeElement.offsetWidth + 2; // 2 is the border size
    if (!isEnabled) {
      this.scrollDistance = 0;
    }
    const detectChanges = isEnabled !== this._showPaginationControls;
    this._showPaginationControls = isEnabled;

    if (detectChanges) {
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Evaluate whether the before and after controls should be enabled or disabled.
   * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
   * before button. If the header is at the end of the list (scroll distance is equal to the
   * maximum distance we can scroll), then disable the after button.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _checkScrollingControls() {
    // Check if the pagination arrows should be activated.
    this._disableScrollBefore = this.scrollDistance === 0;
    this._disableScrollAfter =
      this.scrollDistance === this._getMaxScrollDistance();
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Determines what is the maximum length in pixels that can be set for the scroll distance. This
   * is equal to the difference in width between the tab list container and tab header container.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _getMaxScrollDistance(): number {
    const lengthOfTabList = this._tabList.nativeElement.scrollWidth;
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    return lengthOfTabList - viewLength || 0;
  }

  /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
  _updateTabScrollPosition() {
    const scrollDistance = this.scrollDistance;
    const translateX = -scrollDistance;
    // Don't use `translate3d` here because we don't want to create a new layer. A new layer
    // seems to cause flickering and overflow in Internet Explorer. For example, the ink bar
    // and ripples will exceed the boundaries of the visible tab bar.
    // See: https://github.com/angular/material2/issues/10276
    this._tabList.nativeElement.style.transform = `translateX(${translateX}px)`;
  }

  /** Tells the active indicator to align itself to the current label wrapper */
  _alignActiveIndicatorToSelectedTab(): void {
    const selectedLabelWrapper =
      this._labelWrappers?.length > 0
        ? this._labelWrappers.toArray()[this.selectedIndex].elementRef
            .nativeElement
        : null;
    this._activeIndicator.alignToElement(selectedLabelWrapper);
  }

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _viewportRuler: ViewportRuler,
  ) {}
}
