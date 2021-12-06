import { ValueOf } from '../types';

export const StepState = {
  Default: 'default',
  Done: 'done',
  Error: 'error',
  Pending: 'pending',
} as const;

export type StepState = ValueOf<typeof StepState>;

export interface StepItem {
  label: string;
  description?: string;
  state?: StepState;
  optional?: boolean;
  /**
   * @deprecated 每个步骤不再需要单独控制。通过组件参数 selectable 统一控制
   */
  editable?: boolean;
}

export type StepsOrientation = 'horizontal' | 'vertical';

export type StepsType = 'step' | 'progress';
