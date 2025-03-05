import { FocusMonitor } from '@angular/cdk/a11y';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem } from '../internal/utils';

import { BaseRadio } from './base-radio';
import { RadioGroupComponent } from './radio-group/radio-group.component';

@Component({
  selector: 'aui-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  imports: [NgClass],
})
export class RadioComponent extends BaseRadio {
  bem: Bem = buildBem('aui-radio');

  get rootClass() {
    return `${this.bem.block()} ${this.disabled ? 'isDisabled' : ''} ${
      this.checked ? 'isChecked' : ''
    }`;
  }

  constructor(
    radioGroup: RadioGroupComponent,
    focusMonitor: FocusMonitor,
    cdr: ChangeDetectorRef,
  ) {
    super(radioGroup, focusMonitor, cdr);
  }
}
