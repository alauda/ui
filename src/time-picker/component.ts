import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { updateDateByTimeModel } from '../date-picker/calendar/util';
import { CommonFormControl } from '../form/common-form';
import { TooltipDirective } from '../tooltip';
import { ComponentSize } from '../types';

import {
  TimePickerDataLike,
  TimePickerModel,
  isTimePickerModel,
} from './time-picker.type';
import { HOUR_ITEMS, MINUTE_ITEMS, SECOND_ITEMS } from './constant';

dayjs.extend(customParseFormat);

@Component({
  selector: 'aui-time-picker',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent extends CommonFormControl<
  TimePickerDataLike,
  TimePickerModel
> {
  @Input()
  format = 'HH:mm:ss';

  @Input()
  size: ComponentSize = ComponentSize.Medium;

  @Input()
  placeholder = '';

  @Input()
  clearable = true;

  @Input()
  showIcon = true;

  @Input()
  disableHours: () => number[];

  @Input()
  disableMinutes: (hour?: number) => number[];

  @Input()
  disableSeconds: (hour?: number, minute?: number) => number[];

  @Input()
  hourStep = 1;

  @Input()
  minuteStep = 1;

  @Input()
  secondStep = 1;

  @Input()
  footerTemplate: TemplateRef<void>;

  @Output()
  readonly open = new EventEmitter<void>();

  @Output()
  readonly close = new EventEmitter<void>();

  @ViewChild('tooltipRef')
  tooltipRef: TooltipDirective;

  timeValue: Dayjs = null;
  timeFormatValue = '';

  override writeValue(value: TimePickerDataLike) {
    if (!value) {
      return this.setValue(null);
    }
    let result: Dayjs;
    if (isTimePickerModel(value)) {
      result = updateDateByTimeModel(dayjs(), value);
    } else {
      result = dayjs(value);
      this.submit(false, result);
    }
    const validResult = this.validResult(result);
    this.setValue(validResult);
    super.writeValue(validResult);
  }

  setValue(value: Dayjs) {
    this.timeValue = value;
    this.timeFormatValue = value ? dayjs(value).format(this.format) : null;
    this.cdr.markForCheck();
  }

  changeFromPanel(value: Dayjs) {
    this.timeFormatValue = value?.format(this.format);
  }

  changeFromInput(source: string) {
    if (!source) {
      this.timeValue = null;
    } else {
      const afterParsed = dayjs(source, this.format);
      if (afterParsed.isValid()) {
        this.timeValue = afterParsed;
      }
    }
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        this.openPanel();
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'Escape':
        this.closePanel();
        event.stopPropagation();
        event.preventDefault();
        break;
    }
  }

  handleTooltipVisible(visible: boolean) {
    if (visible) {
      this.open.emit();
    } else {
      if (this.onTouched) {
        this.onTouched();
      }
      this.setValue(this.timeValue);
      this.submit();

      this.close.emit();
    }
  }

  openPanel() {
    if (this.tooltipRef.isCreated) {
      return;
    }
    this.tooltipRef.show();
    this.open.next();
  }

  closePanel() {
    if (!this.tooltipRef.isCreated) {
      return;
    }
    this.tooltipRef.hide();
    this.close.next();
  }

  clearValue(event: Event) {
    this.setValue(null);
    this.submit();
    event.stopPropagation();
    event.preventDefault();
  }

  submit(close = true, value?: Dayjs) {
    const refer = value ?? this.timeValue;
    this.emitModel(
      refer
        ? {
            second: refer.second(),
            minute: refer.minute(),
            hour: refer.hour(),
          }
        : null,
    );
    if (close) {
      this.closePanel();
    }
  }

  private validResult(result: Dayjs) {
    const validHours = this.validHours();
    result = result.set(
      'hour',
      validHours.includes(result.hour()) ? result.hour() : validHours[0],
    );

    const validMinutes = this.validMinutes(result.hour());
    result = result.set(
      'minute',
      validMinutes.includes(result.minute())
        ? result.minute()
        : validMinutes[0],
    );

    const validSeconds = this.validSeconds(result.hour(), result.minute());
    result = result.set(
      'second',
      validSeconds.includes(result.second())
        ? result.second()
        : validSeconds[0],
    );
    return result;
  }

  private validHours() {
    const disabledHours = this.disableHours?.() || [];
    return HOUR_ITEMS.filter(hour => !disabledHours.includes(hour));
  }

  private validMinutes(hour: number) {
    const disabledMinutes = this.disableMinutes?.(hour) || [];
    return MINUTE_ITEMS.filter(minute => !disabledMinutes.includes(minute));
  }

  private validSeconds(hour: number, minute: number) {
    const disabledSeconds = this.disableSeconds?.(hour, minute) || [];
    return SECOND_ITEMS.filter(second => !disabledSeconds.includes(second));
  }
}
