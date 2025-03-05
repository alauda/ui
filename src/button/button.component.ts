import { FocusMonitor } from '@angular/cdk/a11y';
import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';
import { ComponentSize } from '../internal/types';

import { ButtonType } from './button.types';

const prefix = 'aui-button--';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[aui-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  imports: [NgIf, IconComponent],
})
export class ButtonComponent implements OnDestroy {
  @Input('aui-button')
  get type() {
    return this._type;
  }

  set type(val) {
    if (!val || val === this._type) {
      return;
    }
    this.renderer.removeClass(this.el.nativeElement, prefix + this._type);
    this.renderer.addClass(this.el.nativeElement, prefix + val);
    this._type = val;
  }

  @Input()
  get size() {
    return this._size;
  }

  set size(val) {
    // when change from other size to default
    if (!val) {
      val = ComponentSize.Medium;
    }
    if (this._size === val) {
      return;
    }
    this.renderer.removeClass(this.el.nativeElement, prefix + this._size);
    this.renderer.addClass(this.el.nativeElement, prefix + val);
    this._size = val;
  }

  @Input()
  get plain() {
    return this._plain;
  }

  set plain(val) {
    if (this._plain === val) {
      return;
    }
    this.switchAssertClass('isPlain', val);
    this._plain = val;
  }

  @Input()
  get loading() {
    return this._loading;
  }

  set loading(val) {
    if (this._loading === val) {
      return;
    }
    this.switchAssertClass('isLoading', val);
    this._loading = val;
  }

  @Input()
  get round() {
    return this._round;
  }

  set round(val) {
    if (this._round === val) {
      return;
    }
    this.switchAssertClass('isRound', val);
    this._round = val;
  }

  @Input()
  get square() {
    return this._square;
  }

  set square(val) {
    if (this._square === val) {
      return;
    }
    this.switchAssertClass('isSquare', val);
    this._square = val;
  }

  private _type: ButtonType = ButtonType.Default;
  private _size: ComponentSize = ComponentSize.Medium;
  private _plain = false;
  private _loading = false;
  private _round = false;
  private _square = false;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    private readonly focusMonitor: FocusMonitor,
  ) {
    this.renderer.addClass(this.el.nativeElement, 'aui-button');
    this.renderer.addClass(this.el.nativeElement, prefix + this.type);
    this.renderer.addClass(this.el.nativeElement, prefix + this.size);

    this.focusMonitor.monitor(this.el.nativeElement, false);
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.el.nativeElement);
  }

  private switchAssertClass(className: string, val: boolean) {
    if (val) {
      this.renderer.addClass(this.el.nativeElement, className);
    } else {
      this.renderer.removeClass(this.el.nativeElement, className);
    }
  }
}
