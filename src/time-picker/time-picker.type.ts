import { ConfigType } from 'dayjs';

import { _isNumberValue } from '../utils';

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
    _isNumberValue(item?.second) ||
    _isNumberValue(item?.minute) ||
    _isNumberValue(item?.hour)
  );
}
