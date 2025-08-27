import { ListRange } from '@angular/cdk/collections';
import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy,
} from '@angular/cdk/scrolling';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, distinctUntilChanged } from 'rxjs';

@Injectable()
export class FixedSizeTableVirtualScrollStrategy
  implements VirtualScrollStrategy
{
  private _rowHeight = 42;
  private _headerHeight = 42;
  private _bufferSize = 10;
  private readonly _indexChange = new Subject<number>();
  viewport: CdkVirtualScrollViewport;

  scrolledIndexChange = this._indexChange.pipe(distinctUntilChanged());
  stickyChange = new Subject<number>();

  renderedRangeStream = new BehaviorSubject<ListRange>({ start: 0, end: 0 });

  get dataLength(): number {
    return this._dataLength;
  }

  set dataLength(value: number) {
    if (value !== this._dataLength) {
      this._dataLength = value;
      this.onDataLengthChanged();
    }
  }

  private _dataLength = 0;

  attach(viewport: CdkVirtualScrollViewport): void {
    this.viewport = viewport;
    this.viewport.renderedRangeStream.subscribe(this.renderedRangeStream);
    this.onDataLengthChanged();
  }

  detach(): void {
    this._indexChange.complete();
    this.renderedRangeStream.complete();
    this.stickyChange.complete();
  }

  onContentScrolled(): void {
    this._updateContent();
  }

  onDataLengthChanged(): void {
    if (this.viewport) {
      this.viewport.setTotalContentSize(this._rowHeight * this.dataLength);
    }
    this._updateContent();
  }

  onContentRendered(): void {
    // no-op
  }

  onRenderedOffsetChanged(): void {
    // no-op
  }

  scrollToIndex(index: number, behavior: ScrollBehavior): void {
    if (!this.viewport || !this._rowHeight) {
      return;
    }
    this.viewport.scrollToOffset(
      (index - 1) * this._rowHeight + this._headerHeight,
      behavior,
    );
  }

  setConfig(rowHeight: number, headerHeight: number, bufferSize: number) {
    this._rowHeight = rowHeight;
    this._headerHeight = headerHeight;
    this._bufferSize = bufferSize;
    this.onDataLengthChanged();
  }

  private _updateContent() {
    if (!this.viewport) {
      return;
    }
    const newIndex =
      Math.round(
        (this.viewport.measureScrollOffset() - this._headerHeight) /
          this._rowHeight,
      ) + 1;
    const start = Math.max(0, newIndex - this._bufferSize);
    const end = Math.min(
      this._dataLength,
      newIndex +
        Math.ceil(this.viewport.getViewportSize() / this._rowHeight) +
        this._bufferSize,
    );
    const renderedOffset = start * this._rowHeight;
    this.viewport.setRenderedContentOffset(renderedOffset);
    this.viewport.setRenderedRange({ start, end });
    this.stickyChange.next(renderedOffset);
    this._indexChange.next(newIndex);
  }
}
