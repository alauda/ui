import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { CdkHeaderRowDef } from '@angular/cdk/table';
import {
  AfterContentInit,
  ContentChild,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  forwardRef,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

import { TableComponent } from '../table/public-api';

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
  // tslint:disable-next-line: directive-selector
  selector: 'aui-virtual-scroll-viewport[fixedSize]',
  exportAs: 'viewPort',
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: _tableVirtualScrollDirectiveStrategyFactory,
      deps: [forwardRef(() => FixedSizeTableVirtualScrollDirective)],
    },
  ],
})
export class FixedSizeTableVirtualScrollDirective
  implements AfterContentInit, OnChanges, OnDestroy {
  private readonly onDestroy$ = new Subject();

  @Input()
  rowHeight: number = defaults.rowHeight;

  @Input()
  headerHeight: number = defaults.headerHeight;

  @Input()
  buffer: number = defaults.buffer;

  @Input()
  dataSource: readonly unknown[];

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
    this.scrollStrategy.renderedRangeStream
      .pipe(
        map(({ start, end }) =>
          typeof start !== 'number' || typeof end !== 'number'
            ? this.dataSource
            : this.dataSource?.slice(start, end),
        ),
        takeUntil(this.onDestroy$),
      )
      .subscribe(data => {
        this.table.dataSource = data;
      });
  }

  ngOnChanges({ dataSource, rowHeight, headerHeight, buffer }: SimpleChanges) {
    if (dataSource) {
      this.scrollStrategy.dataLength = this.dataSource?.length;
    }
    if (rowHeight || headerHeight || buffer) {
      this.scrollStrategy.setConfig(
        this.rowHeight,
        this.headerHeight,
        this.buffer,
      );
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private isStickyEnabled(): boolean {
    return (
      !!this.scrollStrategy.viewport &&
      // @ts-expect-error
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
      .querySelectorAll(stickyHeaderSelector)
      .forEach((el: HTMLElement) => {
        const parent = el.parentElement;
        let baseOffset = 0;
        if (this.stickyPositions.has(parent)) {
          baseOffset = this.stickyPositions.get(parent);
        }
        el.style.top = `${baseOffset - offset}px`;
      });
  }
}
