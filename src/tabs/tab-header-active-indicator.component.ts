import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem } from '../utils/bem';

import { TabType } from './tabs.types';

@Component({
  selector: 'aui-tab-header-active-indicator',
  templateUrl: './tab-header-active-indicator.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class TabHeaderActiveIndicatorComponent {
  @Input()
  type: TabType = TabType.Line;

  bem: Bem = buildBem('aui-tab-header-active-indicator');

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _ngZone: NgZone,
  ) {}

  /**
   * Calculates the styles from the provided element in order to align the indicator to that element.
   * Shows the indicator if previously set as hidden.
   * @param element
   */
  alignToElement(element: HTMLElement) {
    if (typeof requestAnimationFrame !== 'undefined') {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => this._setStyles(element));
      });
    } else {
      this._setStyles(element);
    }
  }

  /**
   * Sets the proper styles to the element.
   * @param element
   */
  private _setStyles(element: HTMLElement) {
    const positions = this._getElementPosition(element);
    const nativeEl = this._elementRef.nativeElement;
    nativeEl.style.left = positions.left;
    nativeEl.style.width = positions.width;
  }

  private _getElementPosition(element: HTMLElement) {
    return {
      left: element ? (element.offsetLeft || 0) + 'px' : '0',
      width: element ? (element.offsetWidth || 0) + 'px' : '0',
    };
  }
}
