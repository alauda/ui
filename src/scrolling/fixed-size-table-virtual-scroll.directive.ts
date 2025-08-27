import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { CdkHeaderRowDef } from '@angular/cdk/table';
import {
  AfterContentInit,
  ContentChild,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs';

import { TableComponent } from '../table';

import { FixedSizeTableVirtualScrollStrategy } from './fixed-size-table-virtual-scroll-strategy';

export function _tableVirtualScrollDirectiveStrategyFactory(
  tableDir: FixedSizeTableVirtualScrollDirective,
) {
  return tableDir.scrollStrategy;
}

const stickyHeaderSelector = '.aui-table__header-row.aui-table-sticky';

const defaults = {
  rowHeight: 42,
  headerHeight: 42,
  buffer: 10,
};

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'aui-virtual-scroll-viewport[fixedSize]',
  exportAs: 'viewPort',
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: _tableVirtualScrollDirectiveStrategyFactory,
      deps: [forwardRef(() => FixedSizeTableVirtualScrollDirective)],
    },
  ],
  standalone: true,
})
export class FixedSizeTableVirtualScrollDirective<T = unknown>
  implements AfterContentInit, OnChanges, OnDestroy
{
  private readonly onDestroy$ = new Subject();
  private readonly _dataSource$$ = new BehaviorSubject<T[]>([]);

  @Input()
  rowHeight: number = defaults.rowHeight;

  @Input()
  headerHeight: number = defaults.headerHeight;

  @Input()
  buffer: number = defaults.buffer;

  @Input()
  set dataSource(dataSource: T[]) {
    this._dataSource$$.next(dataSource);
    this.scrollStrategy.dataLength = dataSource?.length;
  }

  @ContentChild(TableComponent, { static: false })
  table: TableComponent<any>;

  scrollStrategy = new FixedSizeTableVirtualScrollStrategy();

  private stickyPositions: Map<HTMLElement, number>;

  ngAfterContentInit() {
    this.scrollStrategy.stickyChange
      .pipe(
        filter(() => this.isStickyEnabled()),
        tap(() => {
          if (!this.stickyPositions) {
            this.initStickyPositions();
          }
        }),
        takeUntil(this.onDestroy$),
      )
      .subscribe(stickyOffset => {
        this.setSticky(stickyOffset);
      });
    combineLatest([this.scrollStrategy.renderedRangeStream, this._dataSource$$])
      .pipe(
        map(([{ start, end }, dataSource]) =>
          typeof start !== 'number' || typeof end !== 'number'
            ? dataSource
            : dataSource?.slice(start, end),
        ),
        takeUntil(this.onDestroy$),
      )
      .subscribe(data => {
        this.table.dataSource = data;
      });
  }

  ngOnChanges({ rowHeight, headerHeight, buffer }: SimpleChanges) {
    if (rowHeight || headerHeight || buffer) {
      this.scrollStrategy.setConfig(
        this.rowHeight,
        this.headerHeight,
        this.buffer,
      );
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  private isStickyEnabled(): boolean {
    return (
      !!this.scrollStrategy.viewport &&
      // @ts-expect-error should get private property _headerRowDefs
      (this.table._headerRowDefs as CdkHeaderRowDef[])
        .map(def => def.sticky)
        .reduce((prev, curr) => prev && curr, true)
    );
  }

  private initStickyPositions() {
    this.stickyPositions = new Map<HTMLElement, number>();
    this.scrollStrategy.viewport.elementRef.nativeElement
      .querySelectorAll(stickyHeaderSelector)
      .forEach(el => {
        const parent = el.parentElement;
        if (!this.stickyPositions.has(parent)) {
          this.stickyPositions.set(parent, parent.offsetTop);
        }
      });
  }

  private setSticky(offset: number) {
    this.scrollStrategy.viewport.elementRef.nativeElement
      .querySelectorAll<HTMLElement>(stickyHeaderSelector)
      .forEach(el => {
        const parent = el.parentElement;
        let baseOffset = 0;
        if (this.stickyPositions.has(parent)) {
          baseOffset = this.stickyPositions.get(parent);
        }
        el.style.top = `${baseOffset - offset}px`;
      });
  }
}
