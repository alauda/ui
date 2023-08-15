import { CdkColumnDef } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription, merge } from 'rxjs';

/*
 * TODO: prevent ```public property '' of exported class has or is using name ''
 * from external module '' but cannot be named``` issue.
 */
import { Bem, buildBem } from '../utils';

import { getSortHeaderNotContainedWithinSortError } from './sort-errors';
import { SortDirective } from './sort.directive';
import { ArrowViewState, SortDirection, Sortable } from './sort.types';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[aui-sort-header]',
  templateUrl: 'sort-header.component.html',
  styleUrls: ['sort-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SortHeaderComponent implements Sortable, OnInit, OnDestroy {
  private readonly _rerenderSubscription: Subscription;

  _viewState: ArrowViewState;

  arrowDirection: SortDirection = '';

  @Input('aui-sort-header')
  id: string;

  @Input()
  start: 'asc' | 'desc';

  bem: Bem = buildBem('aui-sort-header');

  constructor(
    cdr: ChangeDetectorRef,
    @Optional() public _sort: SortDirective,
    @Optional() public _cdkColumnRef: CdkColumnDef,
  ) {
    if (!_sort) {
      throw getSortHeaderNotContainedWithinSortError();
    }

    this._rerenderSubscription = merge(
      _sort.sortChange,
      _sort._stateChanges,
    ).subscribe(() => {
      if (this._isSorted()) {
        this._updateArrowDirection();
      }

      if (!this._isSorted() && this._viewState === 'active') {
        this._viewState = '';
      }

      cdr.markForCheck();
    });
  }

  ngOnInit() {
    if (!this.id && this._cdkColumnRef) {
      this.id = this._cdkColumnRef.name;
    }
    this._updateArrowDirection();
    this._viewState = this._isSorted() ? 'active' : '';
    this._sort.register(this);
  }

  ngOnDestroy() {
    this._sort.deregister(this);
    this._rerenderSubscription.unsubscribe();
  }

  _handleClick() {
    this._sort.sort(this);
    this._viewState = this._isSorted() ? 'active' : '';
  }

  _isSorted() {
    return (
      this._sort.active === this.id &&
      ['asc', 'desc'].includes(this._sort.direction)
    );
  }

  _updateArrowDirection() {
    this.arrowDirection = this._isSorted()
      ? this._sort.direction
      : this.start || this._sort.start;
  }
}
