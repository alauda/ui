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
import {
  TimePickerDataLike,
  TimePickerModel,
  TooltipDirective,
  isTimePickerModel,
} from '../public-api';
import { ComponentSize } from '../types';
import { buildBem } from '../utils';

dayjs.extend(customParseFormat);

const bem = buildBem('aui-time-picker');

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

  @Input()
  tooltipPosition = 'bottom start';

  @Output()
  openChange = new EventEmitter<boolean>();

  @ViewChild('tooltip', { static: false })
  tooltip: TooltipDirective;

  timeValue: Dayjs = null;
  timeFormatValue = '';
  focused = false;
  hovered = false;
  bem = bem;

  writeValue(value: TimePickerDataLike) {
    super.writeValue(value);
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
    this.setValue(result);
  }

  setValue(value: Dayjs) {
    this.timeValue = value;
    this.timeFormatValue = value ? dayjs(value).format(this.format) : null;
    this.cdr.markForCheck();
  }

  changeFromPanel(value: Dayjs) {
    // sync input value
    this.timeFormatValue = value?.format(this.format);
    this.cdr.markForCheck();
  }

  changeFromInput(source: string) {
    // sync panel value
    if (!source) {
      this.timeValue = null;
    } else {
      const afterParsed = dayjs(source, this.format);
      if (afterParsed.isValid()) {
        this.timeValue = afterParsed;
      }
    }
  }

  blur() {
    if (this.onTouched) {
      this.onTouched();
    }
    // dateFormatValue may need reset
    this.setValue(this.timeValue);
    this.openChange.next(false);
  }

  openTooltip() {
    if (this.tooltip.isCreated) {
      return;
    }
    this.tooltip.createTooltip();
    this.openChange.next(true);
  }

  clear() {
    this.setValue(null);
    this.submit();
  }

  submit(close = true, value?: Dayjs) {
    close && this.tooltip.disposeTooltip();
    const refer = value ?? this.timeValue;
    this.emitValue(
      refer
        ? {
            second: refer.second(),
            minute: refer.minute(),
            hour: refer.hour(),
          }
        : null,
    );
  }
}
