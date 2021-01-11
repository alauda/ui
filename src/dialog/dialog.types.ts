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

export type CustomBeforeAction<T> = () => Promise<T> | Observable<T>;

export type BeforeAction<T> =
  | ((resolve: (result?: T) => void, reject: () => void) => void)
  | CustomBeforeAction<T>;
