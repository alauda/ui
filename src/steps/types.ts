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
}

export type StepsOrientation = 'horizontal' | 'vertical';

export type StepsType = 'step' | 'progress';
