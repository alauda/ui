import { Dayjs } from 'dayjs';
import { HOUR_ITEMS, MINUTE_ITEMS, SECOND_ITEMS } from './constant';

function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (x: T) => fns.reduceRight((acc, fn) => fn(acc), x);
}

function closestTo(num: number) {
  return (prev: number, curr: number) =>
    Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev;
}

function validHoursFn(disableHours?: () => number[]) {
  const disabledHours = disableHours?.() || [];
  const validHours = HOUR_ITEMS.filter(hour => !disabledHours.includes(hour));
  return (result: Dayjs) =>
    result.set(
      'hour',
      validHours.includes(result.hour())
        ? result.hour()
        : validHours.reduce(closestTo(result.hour()), validHours[0]),
    );
}

function validMinutesFn(disableMinutes?: (hour?: number) => number[]) {
  return (result: Dayjs) => {
    const disabledMinutes = disableMinutes?.(result.hour()) || [];
    const validMinutes = MINUTE_ITEMS.filter(
      minute => !disabledMinutes.includes(minute),
    );
    return result.set(
      'minute',
      validMinutes.includes(result.minute())
        ? result.minute()
        : validMinutes.reduce(closestTo(result.minute()), validMinutes[0]),
    );
  };
}

function validSecondsFn(
  disableSeconds?: (hour?: number, minute?: number) => number[],
) {
  return (result: Dayjs) => {
    const disabledSeconds =
      disableSeconds?.(result.hour(), result.minute()) || [];
    const validSeconds = SECOND_ITEMS.filter(
      second => !disabledSeconds.includes(second),
    );
    return result.set(
      'second',
      validSeconds.includes(result.second())
        ? result.second()
        : validSeconds.reduce(closestTo(result.second()), validSeconds[0]),
    );
  };
}

export function validResult(disabledTimeFn: {
  hours?: () => number[];
  minutes?: (hour?: number) => number[];
  seconds?: (hour?: number, minute?: number) => number[];
}) {
  const validResultFn = compose(
    validSecondsFn(disabledTimeFn?.seconds),
    validMinutesFn(disabledTimeFn?.minutes),
    validHoursFn(disabledTimeFn?.hours),
  );
  return (result: Dayjs) => validResultFn(result);
}
