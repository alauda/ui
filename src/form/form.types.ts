import { ValueOf } from '../internal/types';

export const LabelPosition = {
  Top: 'top',
  Left: 'left',
  Right: 'right',
} as const;

export const FormItemWidth = {
  Small: 'small',
  /**
   * @deprecated Prefer to 'Large'
   */
  Medium: 'medium',
  Large: 'large',
} as const;

export type LabelPosition = ValueOf<typeof LabelPosition>;

export type FormItemWidth = ValueOf<typeof FormItemWidth>;
