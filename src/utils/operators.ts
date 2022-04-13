import { pipe, publishReplay, refCount } from 'rxjs';

/**
 * @see https://rxjs.dev/deprecations/multicasting#publishreplay
 *
 * FIXME:
 * The recommended replacement is breaking our apps for watching resources,
 * revert it back temporarily. see also https://github.com/ReactiveX/rxjs/discussions/6438
 */
export const publishRef = <T>(bufferSize = 1, windowTime?: number) =>
  // eslint-disable-next-line sonar/deprecation
  pipe(publishReplay<T>(bufferSize, windowTime), refCount());
