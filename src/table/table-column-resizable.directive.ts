import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  fromEvent,
  map,
  merge,
  Subscription,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';

import { buildBem, getCompatibleStylesRenderer } from '../utils';

import { TableColumnDefDirective } from './table-column-def.directive';
import { tableBem, TableComponent } from './table.component';

let tableColumnResizableID = 0;

const resizableBem = buildBem('aui-table-column-resizable');
const markLineWidth = 1;

@Directive({
  selector: '[auiTableColumnResizable]',
  standalone: true,
})
export class TableColumnResizableDirective
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input()
  minWidth = '40px';

  @Input()
  maxWidth = '80%';

  private readonly renderer2 = inject(Renderer2);
  private readonly tableColumnDefDirective = inject(TableColumnDefDirective);
  private readonly tableComponent = inject(TableComponent);

  private readonly columnElement: HTMLElement =
    inject(ElementRef).nativeElement;

  private readonly containerElement: HTMLElement =
    this.tableComponent.elementRef.nativeElement;

  private readonly hostAttr = `table-column-resizable-${tableColumnResizableID++}`;
  private readonly stylesRenderer = getCompatibleStylesRenderer();
  private resizeSubscription: Subscription;

  ngOnInit() {
    this.containerElement.setAttribute(this.hostAttr, '');
  }

  ngAfterViewInit() {
    const resizeHandle = this.createResizeHandle();
    this.bindResizable(resizeHandle);
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
    this.containerElement.removeAttribute(this.hostAttr);
    this.stylesRenderer.cleanup();
  }

  private bindResizable(resizeHandle: HTMLElement) {
    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(take(1));

    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
      takeUntil(mouseUp$),
    );

    this.resizeSubscription = fromEvent<MouseEvent>(resizeHandle, 'mousedown')
      .pipe(
        switchMap(mouseDownEvent => {
          mouseDownEvent.preventDefault();
          mouseDownEvent.stopPropagation();

          this.renderer2.setStyle(resizeHandle, 'visibility', 'hidden');
          const resizeRange = this.getResizeRange();
          const initialMouseX = mouseDownEvent.clientX;
          const columnWidth = this.getColumnWidth();
          const columnOffset = this.getColumnOffset();
          const resizeMarkLine = this.createResizeMarkLine(
            columnOffset + columnWidth,
          );
          const resizeOverlay = this.createResizeOverlay();

          return merge(
            mouseMove$.pipe(
              map(
                mouseMoveEvent => () =>
                  resizeMarkLine.updateOffset(
                    columnOffset +
                      this.getWidthInRange(
                        resizeRange,
                        columnWidth + mouseMoveEvent.clientX - initialMouseX,
                      ),
                  ),
              ),
            ),
            mouseUp$.pipe(
              map(mouseUpEvent => () => {
                this.renderer2.removeStyle(resizeHandle, 'visibility');
                resizeMarkLine.destroy();
                resizeOverlay.destroy();

                this.renderWidthStyles(
                  this.getWidthInRange(
                    resizeRange,
                    columnWidth + mouseUpEvent.clientX - initialMouseX,
                  ),
                );
              }),
            ),
          );
        }),
      )
      .subscribe(exec => {
        exec();
      });
  }

  private createResizeHandle() {
    const resizeHandle: HTMLDivElement = this.renderer2.createElement('div');
    this.renderer2.addClass(resizeHandle, resizableBem.element('handle'));
    this.renderer2.appendChild(this.columnElement, resizeHandle);

    return resizeHandle;
  }

  private createResizeMarkLine(initialOffset: number) {
    const markLine: HTMLElement = this.renderer2.createElement('div');
    this.renderer2.addClass(markLine, resizableBem.element('mark-line'));
    this.renderer2.setStyle(
      markLine,
      'left',
      initialOffset - markLineWidth + 'px',
    );
    if (this.isStickyLeftBorderColumn()) {
      this.renderer2.addClass(markLine, 'inStickyBorderElemLeft');
    }
    this.renderer2.appendChild(this.containerElement, markLine);
    return {
      element: markLine,
      updateOffset: (offset: number) => {
        this.renderer2.setStyle(
          markLine,
          'left',
          offset - markLineWidth + 'px',
        );
      },
      destroy: () => {
        this.renderer2.removeChild(this.containerElement, markLine);
      },
    };
  }

  private createResizeOverlay() {
    const resizeOverlay = this.renderer2.createElement('div');
    this.renderer2.addClass(resizeOverlay, resizableBem.element('overlay'));
    this.renderer2.appendChild(this.containerElement, resizeOverlay);
    return {
      element: resizeOverlay,
      destroy: () => {
        this.renderer2.removeChild(this.containerElement, resizeOverlay);
      },
    };
  }

  private getColumnWidth() {
    return this.columnElement.clientWidth;
  }

  private getColumnOffset() {
    return (
      this.columnElement.getBoundingClientRect().left -
      this.containerElement.getBoundingClientRect().left
    );
  }

  private getWidthInRange(
    [minWidth, maxWidth]: [number, number],
    width: number,
  ): number {
    return Math.min(Math.max(width, minWidth), maxWidth);
  }

  private getResizeRange(): [number, number] {
    const minWidth = this.getActualWidth(this.minWidth);
    const maxWidth = this.getActualWidth(this.maxWidth);
    return [minWidth, maxWidth];
  }

  private getActualWidth(width: number | string): number {
    if (typeof width === 'number') {
      return width;
    }
    if (width.endsWith('%')) {
      return (
        (this.containerElement.clientWidth * parseInt(width.slice(0, -1))) / 100
      );
    }
    if (width.endsWith('px')) {
      return parseInt(width.slice(0, -2));
    }
    return parseInt(width);
  }

  private isStickyLeftBorderColumn() {
    return this.columnElement.classList.contains(
      'aui-table-sticky-border-elem-left',
    );
  }

  private renderWidthStyles(width: number) {
    const className = tableBem.element(
      `column-${this.tableColumnDefDirective.cssClassFriendlyName}`,
    );

    const styleString = `[${this.hostAttr}] .${className} {
      flex: none !important;
      width: ${width}px !important;
      min-width: ${width}px !important;
      max-width: ${width}px !important;
    }`;

    this.stylesRenderer.render(styleString);
    this.tableComponent.updateStickyColumnStyles();
  }
}
