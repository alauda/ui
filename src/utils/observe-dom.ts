import { Observable } from 'rxjs';

export const observeResizeOn = <T extends Element>(
  target: T,
  options?: ResizeObserverOptions,
) =>
  new Observable<T>(observer => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        observer.next(entry.target as T);
      }
    });
    resizeObserver.observe(target, options);
    return () => {
      resizeObserver.unobserve(target);
      resizeObserver.disconnect();
    };
  });

export const observeMutationOn = <T extends Node>(
  target: T,
  options?: MutationObserverInit,
) =>
  new Observable<MutationRecord>(observer => {
    const mutationObserver = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        observer.next(mutation);
      }
    });
    mutationObserver.observe(target, options);
    return () => mutationObserver.disconnect();
  });
