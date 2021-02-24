import { ValueOf } from '../types';

export const LabelPosition = {
  Top: 'top',
  Left: 'left',
  Right: 'right',
} as const;

export type LabelPosition = ValueOf<typeof LabelPosition>;
