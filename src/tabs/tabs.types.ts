import { ValueOf } from '../types';

export const TabSize = {
  /** 卡片级尺寸 */
  Large: 'large',

  /** 页面级尺寸 */
  Medium: 'medium',

  /** 小尺寸 */
  Small: 'small',
} as const;

export type TabSize = ValueOf<typeof TabSize>;

export const TabType = {
  Line: 'line',
  Card: 'card',
} as const;

export type TabType = ValueOf<typeof TabType>;
