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
import { HOUR_ITEMS, MINUTE_ITEMS, SECOND_ITEMS } from 'src/time-picker';

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
  set selectedTime(time: TimePickerModel) {
    this._selectedTime = time;
  }

  get selectedTime() {
    return this._selectedTime;
  }

  private _selectedTime: TimePickerModel;

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
      this._cacheDisabledTimeFn = combineDisabledTimeFn(
        this._disabledTimeFn.bind(this),
        this.disabledTime,
      )(selectedDate);
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

  DateNavRange = DateNavRange;
  DatePickerType = DatePickerType;

  override writeValue(obj: Dayjs) {
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
      this.confirmValue(this.selectedDate, !this.showTime);
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
    this.emitValue(value ? dayjs(value) : this.selectedDate);
    closeAfterConfirm && this.confirm.next(null);
  }

  timeDateChange(time: TimePickerModel) {
    if (!this.selectedDate) {
      return;
    }

    this.selectedDate = updateDateByTimeModel(this.selectedDate, time);
    this.emitValue(this.selectedDate);
  }

  clearValue() {
    this.selectedTime = null;
    this.clear.next();
  }

  setToday() {
    this.confirmValue(dayjs(), true);
  }

  private _disabledTimeFn(selectedDate: ConfigType) {
    const returnFnMap: Record<
      keyof ReturnType<DisabledTimeFn>,
      () => number[]
    > = {
      hours: () => [],
      minutes: () => [],
      seconds: () => [],
    };

    if (
      selectedDate &&
      this.minDate &&
      (selectedDate as Dayjs)?.isSame(this.minDate, 'day')
    ) {
      returnFnMap.hours = () =>
        HOUR_ITEMS.filter(item => item < this.minDate.hour());
      returnFnMap.minutes = (hour?: number) => {
        if (hour === this.minDate.hour()) {
          return MINUTE_ITEMS.filter(item => item < this.minDate.minute());
        }
        return [];
      };
      returnFnMap.seconds = (hour?: number, minute?: number) => {
        if (hour === this.minDate.hour() && minute === this.minDate.minute()) {
          return SECOND_ITEMS.filter(item => item < this.minDate.second());
        }
        return [];
      };
    }

    if (
      selectedDate &&
      this.maxDate &&
      (selectedDate as Dayjs)?.isSame(this.maxDate, 'day')
    ) {
      returnFnMap.hours = () =>
        HOUR_ITEMS.filter(item => item > this.maxDate.hour());
      returnFnMap.minutes = (hour?: number) => {
        if (hour === this.maxDate.hour()) {
          return MINUTE_ITEMS.filter(item => item > this.maxDate.minute());
        }
        return [];
      };
      returnFnMap.seconds = (hour?: number, minute?: number) => {
        if (hour === this.maxDate.hour() && minute === this.maxDate.minute()) {
          return SECOND_ITEMS.filter(item => item > this.maxDate.second());
        }
        return [];
      };
    }

    return returnFnMap;
  }
}

function combineDisabledTimeFn(
  ...disabledFnList: DisabledTimeFn[]
): DisabledTimeFn {
  return (date?: ConfigType) => ({
    hours: () =>
      Array.from(
        new Set(
          disabledFnList
            .map(fn => fn(date)?.hours?.() || [])
            .reduce((prev, cur) => [...prev, ...cur], []),
        ),
      ),
    minutes: (hour?: number) =>
      Array.from(
        new Set(
          disabledFnList
            .map(fn => fn(date)?.minutes?.(hour) || [])
            .reduce((prev, cur) => [...prev, ...cur], []),
        ),
      ),
    seconds: (hour?: number, minute?: number) =>
      Array.from(
        new Set(
          disabledFnList
            .map(fn => fn(date)?.seconds?.(hour, minute) || [])
            .reduce((prev, cur) => [...prev, ...cur], []),
        ),
      ),
  });
}
