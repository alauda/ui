import { ValueOf } from '../internal/types';

export const TagType = {
  Primary: 'primary',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Info: 'info',
} as const;

export type TagType = ValueOf<typeof TagType>;
