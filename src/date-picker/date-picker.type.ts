import { ConfigType, Dayjs } from 'dayjs';

export enum Side {
  Left = 'left',
  Right = 'right',
}

export type DisabledTimeFn = (
  date?: ConfigType,
) => {
  hours: () => number[];
  minutes: (hour?: number) => number[];
  seconds: (hour?: number, minute?: number) => number[];
};

export interface CalendarHeaderRange {
  start: Dayjs;
  end?: Dayjs;
}

export enum DateNavRange {
  Decade = 'decade',
  Year = 'year',
  Month = 'month',
}

export type DisabledDateFn = (date: Dayjs, type: DateNavRange) => boolean;
