import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import dayjs, { Dayjs } from 'dayjs';

import { CommonFormControl } from '../../../form/common-form';
import { TimePickerModel } from '../../../time-picker/time-picker.type';
import { buildBem } from '../../../utils';
import { DateNavRange, DisabledTimeFn, Side } from '../../date-picker.type';
import { DatePickerType, MONTH, YEAR } from '../constant';
import {
  composeDisabledDateFn,
  getTimePickerModel,
  getTypeByNavRange,
  maxDate,
  minDate,
  nextNavRangeType,
  sortDates,
  updateDate,
  updateDateByTimeModel,
} from '../util';

const bem = buildBem('aui-date-range-picker-panel');

@Component({
  selector: 'aui-date-range-picker-panel',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerPanelComponent),
      multi: true,
    },
  ],
})
export class DateRangePickerPanelComponent extends CommonFormControl<Dayjs[]> {
  @Input()
  clearable = true;

  @Input()
  clearText: string;

  @Input()
  showTime = true;

  @Input()
  showFooter = true;

  @Input()
  disabledDate: (
    date: Dayjs,
    navRange: DateNavRange,
    startDate: Dayjs,
  ) => boolean = () => false;

  @Input()
  disabledTime: { left: DisabledTimeFn; right: DisabledTimeFn } = {
    left: () => null,
    right: () => null,
  };

  @Input()
  weekStartDay = 0;

  @Input()
  minDate: Dayjs;

  @Input()
  maxDate: Dayjs;

  @Output()
  clear = new EventEmitter<void>();

  @Output()
  confirm = new EventEmitter<void>();

  bem = bem;
  Side = Side;
  DatePickerType = DatePickerType;
  leftDateRange = DateNavRange.Month;
  rightDateRange = DateNavRange.Month;

  FOOTER_DATE_FORMAT = 'YYYY-MM-dd';

  leftAnchor = dayjs();
  rightAnchor = dayjs().add(1, MONTH);

  get maxHeaderAvail() {
    return minDate(this.rightAnchor, this.maxDate);
  }

  get minHeaderAvail() {
    return maxDate(this.minDate, this.leftAnchor);
  }

  // 用于存放 range data 序列，数量为 2 时清除
  rangeValue: Dayjs[] = [];

  // 用于组装匹配日期序列
  matchValues: Dayjs[];

  startTime: TimePickerModel;
  endTime: TimePickerModel;

  override writeValue(obj: Dayjs[]) {
    super.writeValue(obj);
    this.rangeValue = obj || [];
    this.matchValues = [...this.rangeValue];
    this.startTime = getTimePickerModel(obj?.[0]);
    this.endTime = getTimePickerModel(obj?.[1]);
    if (obj?.length === 2) {
      this.reorder(sortDates(obj));
    }
    this.cdr.markForCheck();
  }

  calendarRangeChange(type: DateNavRange, side: Side) {
    if (side === Side.Left) {
      this.leftDateRange = type;
    } else {
      this.rightDateRange = type;
    }
  }

  // range 组件范围受控
  getDateDisabledFn(side: Side, constrainValue: Dayjs) {
    return composeDisabledDateFn(
      (date: Dayjs, navRange: DateNavRange) => {
        if (navRange === DateNavRange.Month) {
          return false;
        }
        if (navRange === DateNavRange.Decade) {
          return date[side === Side.Left ? 'isAfter' : 'isBefore'](
            constrainValue,
            YEAR,
          );
        }
        return !date[side === Side.Left ? 'isBefore' : 'isAfter'](
          constrainValue,
          MONTH,
        );
      },
      (...arg) => this.disabledDate(...arg, this.rangeValue[0]),
    );
  }

  private getDisabledTimeCachedFn(side: Side) {
    let cacheSelectedDate: Dayjs;
    let cacheDisabledTimeFn: ReturnType<DisabledTimeFn>;
    return (value: Dayjs, key: keyof ReturnType<DisabledTimeFn>) => {
      if (value !== cacheSelectedDate) {
        cacheDisabledTimeFn = (this.disabledTime?.[side] || (() => null))(
          value,
        );
        cacheSelectedDate = value;
      }
      return cacheDisabledTimeFn?.[key];
    };
  }

  leftDisabledTimeFn = this.getDisabledTimeCachedFn(Side.Left);
  rightDisabledTimeFn = this.getDisabledTimeCachedFn(Side.Right);

  selectPickerPanel(value: Dayjs, side: Side) {
    const navRange =
      side === Side.Left ? this.leftDateRange : this.rightDateRange;
    const type = getTypeByNavRange(navRange);
    const dateValue = updateDate(
      side === Side.Left ? this.leftAnchor : this.rightAnchor,
      value,
      type,
    );
    const nextRange = nextNavRangeType(navRange, DateNavRange.Month);

    if (side === Side.Left) {
      this.leftAnchor = dateValue;
      this.leftDateRange = nextRange;
    } else {
      this.rightAnchor = dateValue;
      this.rightDateRange = nextRange;
    }

    if (navRange !== DateNavRange.Month) {
      return;
    }

    if (this.leftAnchor.isSame(this.rightAnchor, MONTH)) {
      this.rightAnchor = this.rightAnchor.add(1, MONTH);
    }

    this.rangeValue =
      this.rangeValue.length === 2
        ? [dateValue]
        : sortDates([...this.rangeValue, dateValue]);
    this.matchValues = [...this.rangeValue];
    this.syncTime();
    if (this.rangeValue.length === 2) {
      this.reorder(this.rangeValue);
      this.confirmValue(this.rangeValue, !this.showTime);
    }
  }

  reorder(sortedDate: Dayjs[]) {
    if (!sortedDate[0].isSame(sortedDate[1], MONTH)) {
      this.leftAnchor = updateDate(
        this.leftAnchor,
        sortedDate[0],
        DatePickerType.Day,
      );
      this.rightAnchor = updateDate(
        this.leftAnchor,
        sortedDate[1],
        DatePickerType.Day,
      );
    }
  }

  hoverItem(date: Dayjs) {
    if (this.rangeValue.length === 1) {
      this.matchValues[1] = date;
    }
  }

  confirmValue(value: Dayjs[], closeThen = true) {
    this.emitValue(value);
    closeThen && this.confirm.next();
  }

  timeChange(time: TimePickerModel) {
    if (!time) {
      return;
    }
    this.syncTime();
    if (!this.rangeValue?.length) {
      const date = updateDateByTimeModel(dayjs(), time);
      this.rangeValue = [date, date];
      this.matchValues = [...this.rangeValue];
      this.startTime = this.endTime = time;
    }
    this.emitValue(this.rangeValue);
  }

  syncTime() {
    if (this.showTime && !!this.rangeValue?.length) {
      const startDate = this.rangeValue[0]
        ? updateDateByTimeModel(this.rangeValue[0], this.startTime)
        : null;
      const endDate = this.rangeValue[1]
        ? updateDateByTimeModel(this.rangeValue[1], this.endTime)
        : null;
      if (!this.startTime && startDate) {
        this.startTime = getTimePickerModel(this.rangeValue[0]);
      }
      if (!this.endTime && endDate) {
        this.endTime = getTimePickerModel(this.rangeValue[1]);
      }
      this.rangeValue = [startDate, endDate].filter(i => !!i);
    }
  }
}
