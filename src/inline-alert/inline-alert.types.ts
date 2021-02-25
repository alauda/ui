import { ValueOf } from '../types';

export const InlineAlertType = {
  /**
   * @deprecated use `InlineAlertType.Info` instead
   */
  Primary: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Info: 'info',
} as const;

export type InlineAlertType = ValueOf<typeof InlineAlertType>;
