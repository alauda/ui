import { Dayjs, UnitType } from 'dayjs';

import { TimePickerModel } from '../../time-picker/time-picker.type';
import { DateNavRange, DisabledDateFn } from '../date-picker.type';

import {
  DATE_NAV_RANGES,
  DATE_TYPES,
  DAY,
  DAY_PANEL_COLUMN_COUNT,
  DAY_PANEL_ROW_COUNT,
  DatePickerType,
  MONTH,
  MONTH_PANEL_COLUMN_COUNT,
  MONTH_PANEL_ROW_COUNT,
  YEAR,
  YEAR_PANEL_COLUMN_COUNT,
  YEAR_PANEL_ROW_COUNT,
} from './constant';

export class DateCell {
  isBackground?: boolean; // 面板中非本月日期
  inRange?: boolean; // 在范围组件的范围内
  isRangeStart?: boolean; // 范围组件的范围开始日期
  isRangeEnd?: boolean; // 范围组件的范围结束日期
  isDisabled?: boolean;

  constructor(public value: Dayjs, public label: string | number) {}
}

export function getDatePanelIterable(
  date: Dayjs,
  navRange: DateNavRange,
  weekStartDay: number,
): Iterable<Dayjs> & Iterator<Dayjs> {
  let firstData: Dayjs;
  let counts = 0;
  date = date.clone();
  switch (navRange) {
    case DateNavRange.Month: {
      firstData = date.date(-1).day(weekStartDay);
      if (firstData.isAfter(date)) {
        firstData = firstData.subtract(1, 'week');
      }
      counts = DAY_PANEL_COLUMN_COUNT * DAY_PANEL_ROW_COUNT;

      break;
    }
    case DateNavRange.Year: {
      firstData = date.month(0);
      counts = MONTH_PANEL_COLUMN_COUNT * MONTH_PANEL_ROW_COUNT;

      break;
    }
    case DateNavRange.Decade: {
      firstData = date.subtract(1, YEAR);
      counts = YEAR_PANEL_COLUMN_COUNT * YEAR_PANEL_ROW_COUNT;

      break;
    }
    // No default
  }
  let i = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      if (i < counts) {
        return {
          value: firstData.add(
            i++,
            navRange === DateNavRange.Month
              ? DAY
              : navRange === DateNavRange.Year
              ? MONTH
              : YEAR,
          ),
          done: false,
        };
      }
      return {
        done: true,
        value: null,
      };
    },
  };
}

export function formatDate(type: DateNavRange, dateValue: Dayjs, date: Dayjs) {
  if (!dateValue) {
    return null;
  }
  const label =
    type === DateNavRange.Decade
      ? dateValue.year()
      : type === DateNavRange.Year
      ? dateValue.month() + 1
      : dateValue.date();
  const cell = new DateCell(dateValue, label);
  if (type === DateNavRange.Month && date.month() !== dateValue.month()) {
    cell.isBackground = true;
  }
  return cell;
}

export function nextDatePickerType(
  current: DatePickerType,
  guard?: DatePickerType,
) {
  const guardIndex = guard ? DATE_TYPES.indexOf(guard) : DATE_TYPES.length - 1;
  const currentIndex = DATE_TYPES.indexOf(current);
  if (currentIndex < guardIndex) {
    return DATE_TYPES[currentIndex + 1];
  }
  return current;
}

export function nextNavRangeType(current: DateNavRange, guard?: DateNavRange) {
  const guardIndex = guard
    ? DATE_NAV_RANGES.indexOf(guard)
    : DATE_NAV_RANGES.length - 1;
  const currentIndex = DATE_NAV_RANGES.indexOf(current);
  if (currentIndex < guardIndex) {
    return DATE_NAV_RANGES[currentIndex + 1];
  }
  return current;
}

export function updateDate(
  sourceValue: Dayjs,
  newValue: Dayjs,
  type: DatePickerType,
) {
  const updateTypes = DATE_TYPES.slice(0, DATE_TYPES.indexOf(type) + 1);
  return updateTypes.reduce(
    (acc, curr) => acc.set(curr, newValue.get(curr)),
    sourceValue.clone(),
  );
}

export function calcRangeValue(type: DateNavRange, date: Dayjs) {
  date = date.clone();
  return [DateNavRange.Month, DatePickerType.Year].includes(type)
    ? {
        start: date,
      }
    : {
        start: date.subtract(date.year() % 10, YEAR),
        end: date.add(9 - (date.year() % 10), YEAR),
      };
}

export function sortDates(dates: Dayjs[]) {
  return [...(dates || [])].sort((a, b) =>
    a.isBefore(b) ? -1 : a.isSame(b) ? 0 : 1,
  );
}

export function getNavRangeByType(type: DatePickerType) {
  return {
    [DatePickerType.Day]: DateNavRange.Month,
    [DatePickerType.Month]: DateNavRange.Year,
    [DatePickerType.Year]: DateNavRange.Decade,
  }[type];
}

export function getTypeByNavRange(navRange: DateNavRange) {
  return {
    [DateNavRange.Month]: DatePickerType.Day,
    [DateNavRange.Year]: DatePickerType.Month,
    [DateNavRange.Decade]: DatePickerType.Year,
  }[navRange];
}

export function getTimePickerModel(date: Dayjs): TimePickerModel {
  return date
    ? {
        second: date.second(),
        minute: date.minute(),
        hour: date.hour(),
      }
    : null;
}

export function updateDateByTimeModel(date: Dayjs, time: TimePickerModel) {
  return time
    ? date
        .set('hour', time.hour || 0)
        .set('minute', time.minute || 0)
        .set('second', time.second || 0)
    : date;
}

export const composeDisabledDateFn =
  (...fns: DisabledDateFn[]) =>
  (date: Dayjs, navRange: DateNavRange) =>
    !fns.filter(i => !!i).every(fn => !fn(date, navRange));

export function minDate(a: Dayjs, b: Dayjs, unit: UnitType = 'date') {
  return !a ? b : !b ? a : a.isBefore(b, unit) ? a : b;
}

export function maxDate(a: Dayjs, b: Dayjs, unit: UnitType = 'date') {
  return !a ? b : !b ? a : a.isAfter(b, unit) ? a : b;
}
