import { ValueOf } from '../types';

export const MenuItemType = {
  Default: 'default',
  Primary: 'primary',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
} as const;

export type MenuItemType = ValueOf<typeof MenuItemType>;
