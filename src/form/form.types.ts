import { ValueOf } from '../types';

export const LabelPosition = {
  Top: 'top',
  Left: 'left',
  Right: 'right',
} as const;

export enum FormItemWidth {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type LabelPosition = ValueOf<typeof LabelPosition>;
