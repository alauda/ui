import { FocusMonitor } from '@angular/cdk/a11y';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntil } from 'rxjs';

import { IconComponent } from '../../icon/icon.component';
import { Bem, buildBem } from '../../internal/utils';
import { BaseRadio } from '../base-radio';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { RadioSize } from '../radio.types';

@Component({
  selector: 'aui-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  imports: [NgClass, IconComponent],
})
export class RadioButtonComponent extends BaseRadio implements OnInit {
  bem: Bem = buildBem('aui-radio-button');

  size: RadioSize = RadioSize.Medium;
  isPlain = true;

  get rootClass() {
    return `${this.bem.block(this.size)} ${this.disabled ? 'isDisabled' : ''} ${
      this.checked ? 'isChecked' : ''
    } ${this.isPlain ? 'isPlain' : ''}`;
  }

  constructor(
    radioGroup: RadioGroupComponent,
    focusMonitor: FocusMonitor,
    cdr: ChangeDetectorRef,
  ) {
    super(radioGroup, focusMonitor, cdr);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.radioGroup.size$.pipe(takeUntil(this.destroy$$)).subscribe(size => {
      this.size = size;
      this.cdr.markForCheck();
    });
    this.radioGroup.isPlain$
      .pipe(takeUntil(this.destroy$$))
      .subscribe(isPlain => {
        this.isPlain = isPlain;
        this.cdr.markForCheck();
      });
  }
}
