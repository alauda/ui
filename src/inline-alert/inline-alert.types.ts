import { ValueOf } from '../internal/types';

export const InlineAlertType = {
  Primary: 'primary',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Error: 'error',
  Info: 'info',
} as const;

export type InlineAlertType = ValueOf<typeof InlineAlertType>;
