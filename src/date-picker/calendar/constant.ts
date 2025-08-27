import { DateNavRange } from '../date-picker.type';

export const DATE = 'date';
export const DAY = 'day';
export const MONTH = 'month';
export const YEAR = 'year';
export const HOUR = 'hour';
export const MINUTE = 'minute';
export const SECOND = 'second';

// 根据日期类型，分为年，月，日
export enum DatePickerType {
  Day = 'date',
  Month = 'month',
  Year = 'year',
}

export const MONTH_PANEL_COLUMN_COUNT = 3;
export const MONTH_PANEL_ROW_COUNT = 4;

export const YEAR_PANEL_COLUMN_COUNT = 3;
export const YEAR_PANEL_ROW_COUNT = 4;

export const DAY_PANEL_COLUMN_COUNT = 7;
export const DAY_PANEL_ROW_COUNT = 6;

export const DATE_TYPES = [
  DatePickerType.Year,
  DatePickerType.Month,
  DatePickerType.Day,
];

export const DATE_NAV_RANGES = [
  DateNavRange.Decade,
  DateNavRange.Year,
  DateNavRange.Month,
];
