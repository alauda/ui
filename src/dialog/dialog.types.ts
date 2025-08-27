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
  resolve: (result?: PromiseLike<T> | T) => void,
  reject: (reason?: unknown) => void,
) => void;

export type CustomBeforeAction<T> = () => Observable<T> | PromiseLike<T>;

export type BeforeAction<T> = CustomBeforeAction<T> | PromiseExecutor<T>;
