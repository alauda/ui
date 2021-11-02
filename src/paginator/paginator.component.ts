import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Bem, buildBem } from '../utils';

import { PaginatorIntl } from './paginator-intl';

/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 * @deprecated use Output events directly instead
 */
export class PageEvent {
  /** The current page index. */
  pageIndex: number;

  /**
   * Index of the page that was selected previously.
   */
  previousPageIndex: number;

  /** The current page size */
  pageSize: number;

  /** The current total number of items being paged */
  length: number;
}

@Component({
  selector: 'aui-paginator',
  templateUrl: 'paginator.component.html',
  styleUrls: ['paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class PaginatorComponent implements OnDestroy {
  bem: Bem = buildBem('aui-paginator');

  @Input()
  get pageIndex() {
    return this.currentPage - 1;
  }

  set pageIndex(val) {
    this.currentPage = val + 1;
  }

  @Input()
  currentPage = 1;

  @Input()
  pageSize = 20;

  @Input()
  pageSizeOptions: number[] = [20, 50, 100];

  @Input()
  total = 0;

  /**
   * @deprecated use `total` instead
   */
  @Input()
  get length() {
    return this.total;
  }

  set length(val) {
    this.total = val;
  }

  @Input()
  layout: string | string[] = 'total,pager,sizes';

  @Input()
  disabled = false;

  @Output()
  readonly currentPageChange = new EventEmitter<number>();

  @Output()
  readonly pageSizeChange = new EventEmitter<number>();

  private readonly intlChangeSub: Subscription;

  get pageCount() {
    return Math.ceil(this.total / this.pageSize);
  }

  constructor(
    public intl: PaginatorIntl,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.intlChangeSub = intl.changes.subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this.intlChangeSub.unsubscribe();
  }

  getLayoutArr() {
    return typeof this.layout === 'string'
      ? this.layout.split(',').map(item => item.trim())
      : this.layout;
  }

  getCenterPages() {
    const start = Math.min(
      Math.max(0, this.currentPage - 4),
      Math.max(0, this.pageCount - 7),
    );
    return Array.from({ length: Math.max(this.pageCount - 2, 0) })
      .fill(null)
      .map((_, index) => index + 2)
      .slice(start, start + 5);
  }

  jumpTo(page: number) {
    if (page === this.currentPage) {
      return;
    }
    this.currentPageChange.emit(page);
  }

  navigate(step: number) {
    this.jumpTo(Math.min(Math.max(this.currentPage + step, 1), this.pageCount));
  }

  changePageSize(size: number) {
    if (size === this.pageSize) {
      return;
    }
    this.pageSizeChange.emit(size);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const inputEl = event.target as HTMLInputElement;
      const nextPage = parseInt(inputEl.value, 10);
      if (nextPage > 0 && nextPage <= this.pageCount) {
        this.jumpTo(nextPage);
      } else {
        inputEl.value = this.currentPage + '';
      }
      event.stopPropagation();
      event.preventDefault();
    }
  }

  trackByIndex(index: number) {
    return index;
  }
}
