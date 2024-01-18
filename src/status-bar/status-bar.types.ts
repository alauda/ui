import { ValueOf } from '../internal/types';

export interface Status {
  type?: StatusType;
  class?: string;
  scale: number;
  [key: string]: unknown;
}

export const StatusType = {
  Primary: 'primary',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Info: 'info',
  Pending: 'pending',
} as const;

export type StatusType = ValueOf<typeof StatusType>;

export const StatusBarSize = {
  Medium: 'medium',
  Small: 'small',
} as const;

export type StatusBarSize = ValueOf<typeof StatusBarSize>;
