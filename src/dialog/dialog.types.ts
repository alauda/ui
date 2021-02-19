import { Observable } from 'rxjs';

export enum DialogSize {
  Small = 'small',
  Medium = 'medium',
  Big = 'big',
  Large = 'large',
  Fullscreen = 'fullscreen',
  FitContent = 'fit-content',
}

export enum ConfirmType {
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

export type PromiseExecutor<T> = (
  resolve: (result?: T | PromiseLike<T>) => void,
  reject: (reason?: unknown) => void,
) => void;

export type CustomBeforeAction<T> = () => PromiseLike<T> | Observable<T>;

export type BeforeAction<T> = PromiseExecutor<T> | CustomBeforeAction<T>;
