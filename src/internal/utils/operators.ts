import { ReplaySubject, share, TimestampProvider } from 'rxjs';

export type PublishRefConfig<T> =
  | number
  | (import('rxjs/internal/operators/share').ShareConfig<T> & {
      bufferSize?: number;
      windowTime?: number;
      timestampProvider?: TimestampProvider;
    });

export const publishRef = <T>(bufferSizeOrConfig: PublishRefConfig<T> = {}) => {
  const {
    bufferSize = 1,
    windowTime,
    timestampProvider,
    connector = () =>
      new ReplaySubject(bufferSize, windowTime, timestampProvider),
    resetOnError = false,
    resetOnComplete = false,
    resetOnRefCountZero = true,
  } = typeof bufferSizeOrConfig === 'number'
    ? ({
        bufferSize: bufferSizeOrConfig,
      } as Exclude<PublishRefConfig<T>, number>)
    : bufferSizeOrConfig;
  return share<T>({
    connector,
    resetOnError,
    resetOnComplete,
    resetOnRefCountZero,
  });
};
