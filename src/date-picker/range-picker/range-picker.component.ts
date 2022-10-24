import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import dayjs, { ConfigType, Dayjs } from 'dayjs';

import { CommonFormControl } from '../../form/common-form';
import { ComponentSize } from '../../types';
import { DisabledDateFn, DisabledTimeFn } from '../date-picker.type';

@Component({
  selector: 'aui-range-picker',
  templateUrl: './range-picker.template.html',
  styleUrls: ['./range-picker.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangePickerComponent),
      multi: true,
    },
  ],
})
export class RangePickerComponent extends CommonFormControl<
  ConfigType[],
  Dayjs[]
> {
  @Input()
  clearable = true;

  @Input()
  clearText: string;

  @Input()
  format = 'YYYY-MM-DD';

  @Input()
  showFooter = true;

  @Input()
  showTime = true;

  @Input()
  disabledDate: DisabledDateFn = () => false;

  @Input()
  minDate: Dayjs;

  @Input()
  maxDate: Dayjs;

  @Input()
  disabledTime: { left: DisabledTimeFn; right: DisabledTimeFn } = {
    left: () => null,
    right: () => null,
  };

  @Input()
  weekStartDay = 0;

  @Input()
  size: ComponentSize;

  @Output()
  openChange = new EventEmitter<boolean>();

  value: [Dayjs, Dayjs];

  override valueIn(obj: [ConfigType, ConfigType]) {
    return obj?.map(i => dayjs(i));
  }

  override writeValue(obj: [Dayjs, Dayjs]) {
    super.writeValue(obj);
    this.value = obj;
    this.cdr.markForCheck();
  }

  clearValue() {
    this.value = null;
    this.emitValue(null);
  }
}
