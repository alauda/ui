import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import dayjs, { ConfigType, Dayjs } from 'dayjs';

import { CommonFormControl } from '../../../form/common-form';
import { TimePickerModel } from '../../../time-picker/time-picker.type';
import { DateNavRange, DisabledTimeFn } from '../../date-picker.type';
import { DatePickerType } from '../constant';
import {
  getNavRangeByType,
  getTimePickerModel,
  getTypeByNavRange,
  nextNavRangeType,
  updateDate,
  updateDateByTimeModel,
} from '../util';

@Component({
  selector: 'aui-date-picker-panel',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerPanelComponent),
      multi: true,
    },
  ],
})
export class DatePickerPanelComponent extends CommonFormControl<Dayjs> {
  @Input()
  clearable = true;

  @Input()
  clearText: string;

  @Input()
  set type(type: DatePickerType) {
    this.navRange = getNavRangeByType(type);
    this._type = type;
  }

  get type() {
    return this._type;
  }

  private _type: DatePickerType;

  @Input()
  showTime = false;

  @Input()
  disabledDate: (date: Dayjs, type: DateNavRange) => boolean = () => false;

  @Input()
  disabledTime: DisabledTimeFn = () => null;

  @Input()
  weekStartDay = 0;

  @Input()
  showFooter = true;

  @Input()
  footerTemplate: TemplateRef<unknown>;

  @Input()
  extraFooter: TemplateRef<unknown>;

  @Input()
  minDate: Dayjs;

  @Input()
  maxDate: Dayjs;

  @Output()
  confirm = new EventEmitter<Dayjs>();

  @Output()
  clear = new EventEmitter<void>();

  private _cacheSelectedDate: Dayjs;
  private _cacheDisabledTimeFn: ReturnType<DisabledTimeFn>;

  getDisabledTimeFn(
    selectedDate: Dayjs,
    type: keyof ReturnType<DisabledTimeFn>,
  ) {
    if (selectedDate !== this._cacheSelectedDate) {
      this._cacheDisabledTimeFn = this.disabledTime(selectedDate);
      this._cacheSelectedDate = selectedDate;
    }
    return this._cacheDisabledTimeFn?.[type];
  }

  navRange: DateNavRange;

  get currentNavType() {
    return getTypeByNavRange(this.navRange);
  }

  anchor: Dayjs;

  selectedDate: Dayjs;

  selectedTime: TimePickerModel;

  DateNavRange = DateNavRange;
  DatePickerType = DatePickerType;

  writeValue(obj: Dayjs) {
    super.writeValue(obj);
    this.selectedDate = obj;
    this.selectedTime = getTimePickerModel(obj);
    this.anchor = obj || dayjs();
    this.cdr.markForCheck();
  }

  panelValueChange(value: Dayjs) {
    this.selectedDate = updateDate(
      this.selectedDate || dayjs(),
      value,
      this.currentNavType,
    );
    this.anchor = this.selectedDate;
    this.selectedDate = updateDateByTimeModel(
      this.selectedDate,
      this.selectedTime,
    );
    if (this.type === this.currentNavType) {
      this.emitValueChange(this.selectedDate);
    }
    const nextNavRange = nextNavRangeType(
      this.navRange,
      getNavRangeByType(this.type),
    );
    if (this.navRange !== nextNavRange) {
      this.navRange = nextNavRange;
    }
  }

  confirmValue(value?: ConfigType, closeAfterConfirm = true) {
    this.emitValueChange(value ? dayjs(value) : this.selectedDate);
    closeAfterConfirm && this.confirm.next();
  }

  timeDateChange(time: TimePickerModel) {
    if (!this.selectedDate) {
      return;
    }
    this.selectedDate = updateDateByTimeModel(this.selectedDate, time);
    this.emitValueChange(this.selectedDate);
  }
}
