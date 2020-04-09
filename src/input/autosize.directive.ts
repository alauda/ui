import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

import { calcTextareaHeight } from './utils';
/**
 * Directive to automatically resize a textarea to fit its content.
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'textarea[autosize]',
  exportAs: 'TextareaAutosize',
})
export class AutosizeDirective implements AfterViewInit {
  private _autoSize: {
    minRows: number;
    maxRows?: number;
  } = {
    minRows: 3,
    maxRows: 6,
  };

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

  set autoSize(value: { minRows: number; maxRows?: number }) {
    this._autoSize = value;
    this.resizeTextarea();
  }

  constructor(protected elementRef: ElementRef<HTMLTextAreaElement>) {}

  resizeTextarea() {
    this.textareaCalcStyle = calcTextareaHeight(
      this.elementRef.nativeElement,
      this.autoSize.minRows,
      this.autoSize.maxRows,
    );
    this.elementRef.nativeElement.style.minHeight = this.textareaCalcStyle.minHeight;
    this.elementRef.nativeElement.style.maxHeight = this.textareaCalcStyle.maxHeight;
    this.elementRef.nativeElement.style.height = this.textareaCalcStyle.height;
  }

  ngAfterViewInit() {
    this.resizeTextarea();
  }
}
