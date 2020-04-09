/* eslint-disable sonarjs/no-duplicate-string */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ComponentSize } from '../types';
import { coerceAttrBoolean } from '../utils/coercion';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'input[aui-input],textarea[aui-input]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class InputComponent {
  @Input()
  get size() {
    return this._size;
  }

  set size(val) {
    if (!val || this._size === val) {
      return;
    }
    this.renderer.removeClass(
      this.elementRef.nativeElement,
      'aui-input--' + this._size,
    );
    this.renderer.addClass(this.elementRef.nativeElement, 'aui-input--' + val);
    this._size = val;
    this.size$.next(val);
  }

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(val: any) {
    const booleanVal = coerceAttrBoolean(val);
    if (booleanVal === this._disabled) {
      return;
    }
    if (booleanVal) {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', '');
    } else {
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
    }
    this._disabled = booleanVal;
    this.disabled$.next(booleanVal);
  }

  private _size = ComponentSize.Medium;
  private _disabled = false;

  size$ = new BehaviorSubject<ComponentSize>(this.size);
  disabled$ = new BehaviorSubject<boolean>(this.disabled);

  constructor(
    public elementRef: ElementRef,
    private readonly renderer: Renderer2,
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, 'aui-input');
    this.renderer.addClass(
      this.elementRef.nativeElement,
      'aui-input--' + this.size,
    );
  }
}
