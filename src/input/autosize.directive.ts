import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

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
  // tslint:disable-next-line: directive-selector
  selector: 'textarea[autosize]',
  exportAs: 'TextareaAutosize',
})
export class AutosizeDirective implements AfterViewInit {
  private _autoSize: AutoSizeValue = DEFAULT_VALUE;

  private textareaCalcStyle: {
    minHeight?: string;
    maxHeight?: string;
    height?: string;
  } = {};

  @HostListener('input')
  onTextareaInput() {
    this.resizeTextarea();
  }

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

  constructor(protected elementRef: ElementRef<HTMLTextAreaElement>) {}

  resizeTextarea() {
    const autoSize = this._autoSize;
    this.textareaCalcStyle = calcTextareaHeight(
      this.elementRef.nativeElement,
      autoSize.minRows,
      autoSize.maxRows,
    );
    this.elementRef.nativeElement.style.minHeight = this.textareaCalcStyle.minHeight;
    this.elementRef.nativeElement.style.maxHeight = this.textareaCalcStyle.maxHeight;
    this.elementRef.nativeElement.style.height = this.textareaCalcStyle.height;
  }

  ngAfterViewInit() {
    this.resizeTextarea();
  }
}
