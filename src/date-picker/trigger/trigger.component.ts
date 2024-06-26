import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Dayjs } from 'dayjs';

import { I18nPipe, I18nService } from '../../i18n';
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
  get value() {
    return this.$$value();
  }

  set value(val) {
    const currentValue = this.$$value();
    if (Array.isArray(val)) {
      if (
        !Array.isArray(currentValue) ||
        val.some((v, i) => !v.isSame(currentValue[i]))
      ) {
        this.$$value.set(val);
      }
    } else {
      if (Array.isArray(currentValue) || !val?.isSame(currentValue)) {
        this.$$value.set(val);
      }
    }
  }

  @Input()
  get format() {
    return this.$$format();
  }

  set format(val) {
    if (this.$$format() !== val) {
      this.$$format.set(val);
    }
  }

  @Input()
  get isRange() {
    return this.$$isRange();
  }

  set isRange(val) {
    if (this.$$isRange() !== val) {
      this.$$isRange.set(val);
    }
  }

  @Input()
  size: ComponentSize;

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

  private readonly i18nService = inject(I18nService);

  private readonly $$value = signal<Dayjs | Dayjs[]>(null);

  private readonly $$format = signal<string>(null);

  private readonly $$isRange = signal<boolean>(null);

  $formatValue = computed(() => {
    const format = this.$$format();
    const value = this.$$value();
    const isRange = this.$$isRange();
    const locale = this.i18nService.$locale();

    if (!value) {
      return isRange ? [null, null] : null;
    }

    if (this.format) {
      return Array.isArray(value)
        ? value.map(v => v.format(format))
        : value.format(format);
    }

    return Array.isArray(value)
      ? value.map(v => v.toDate().toLocaleDateString(locale))
      : value.toDate().toLocaleDateString(locale);
  });

  constructor() {
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    this.focusInputRef.elementRef.nativeElement.focus();
  }
}
