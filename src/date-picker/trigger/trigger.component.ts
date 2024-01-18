import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Dayjs } from 'dayjs';

import { I18nPipe } from '../../i18n/i18n.pipe';
import { IconComponent } from '../../icon/icon.component';
import { InputComponent } from '../../input/input.component';
import { ComponentSize } from '../../internal/types';
import { buildBem } from '../../internal/utils';

const bem = buildBem('aui-date-picker-trigger');

@Component({
  selector: 'aui-date-picker-trigger',
  templateUrl: './trigger.template.html',
  styleUrls: ['./trigger.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgClass, NgIf, InputComponent, IconComponent, I18nPipe],
})
export class DatePickerTriggerComponent {
  @Input()
  format = 'YYYY-MM-DD';

  @Input()
  size: ComponentSize;

  @Input()
  isRange: boolean;

  @Input()
  value: Dayjs | Dayjs[];

  @Input()
  clearable = true;

  @Input()
  placeholder: string;

  @Input()
  startPlaceholder: string;

  @Input()
  endPlaceholder: string;

  @Input()
  disabled = false;

  @Output()
  blur = new EventEmitter<void>();

  @Output()
  clear = new EventEmitter<void>();

  @ViewChild('focusRef', { static: false })
  focusInputRef: InputComponent;

  centerFocus = false;
  leftFocus = false;
  rightFocus = false;
  hovered = false;
  bem = bem;

  get isFocus() {
    return this.isRange ? this.leftFocus || this.rightFocus : this.centerFocus;
  }

  get hasValue() {
    return this.isRange
      ? (this.value as Dayjs[])?.[0] || (this.value as Dayjs[])?.[1]
      : !!this.value;
  }

  get showClear() {
    return !this.disabled && this.clearable && this.hasValue && this.hovered;
  }

  constructor() {
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    this.focusInputRef.elementRef.nativeElement.focus();
  }
}
