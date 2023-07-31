import { ConfigType } from 'dayjs';
import { isNumberValue } from '../utils';

export enum TimePickerControlType {
  Hour = 'hour',
  Minute = 'minute',
  Second = 'second',
}

export interface TimePickerModel {
  hour?: number;
  minute?: number;
  second?: number;
}

export type TimePickerDataLike = ConfigType | TimePickerModel;

export function isTimePickerModel(item: any): item is TimePickerModel {
  return (
    isNumberValue(item?.second) ||
    isNumberValue(item?.minute) ||
    isNumberValue(item?.hour)
  );
}
