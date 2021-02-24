import { ValueOf } from '../types';

export const RadioSize = {
  Medium: 'medium',
  Small: 'small',
  Mini: 'mini',
} as const;

export type RadioSize = ValueOf<typeof RadioSize>;
