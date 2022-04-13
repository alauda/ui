import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, startWith, takeUntil } from 'rxjs';

import { calcTextareaHeight } from './utils';

const DEFAULT_VALUE = {
  minRows: 3,
  maxRows: 6,
};

export interface AutoSizeValue {
  minRows: number;
  maxRows?: number;
}

/**
 * Directive to automatically resize a textarea to fit its content.
 */
@Directive({
  selector:
    // eslint-disable-next-line @angular-eslint/directive-selector
    'textarea[autosize][ngModel],textarea[autosize][formControl],textarea[autosize][formControlName]',
  exportAs: 'TextareaAutosize',
})
export class AutosizeDirective implements AfterViewInit, OnDestroy {
  private _autoSize: AutoSizeValue = DEFAULT_VALUE;

  private readonly destroy$$ = new Subject<void>();

  @Input('autosize')
  get autoSize() {
    return this._autoSize;
  }

  set autoSize(value: AutoSizeValue | '') {
    if (!value) {
      value = DEFAULT_VALUE;
    }
    this._autoSize = value;
    this.resizeTextarea();
  }

  constructor(
    private readonly elRef: ElementRef<HTMLTextAreaElement>,
    private readonly ngControl: NgControl,
  ) {}

  resizeTextarea() {
    const el = this.elRef.nativeElement;
    const autoSize = this._autoSize;
    Object.assign(
      el.style,
      calcTextareaHeight(
        el,
        autoSize.minRows ?? DEFAULT_VALUE.minRows,
        autoSize.maxRows || DEFAULT_VALUE.maxRows, // 0 is unacceptable
      ),
    );
  }

  ngAfterViewInit() {
    this.ngControl.valueChanges
      .pipe(startWith(null as void), takeUntil(this.destroy$$))
      .subscribe(() => this.resizeTextarea());
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
