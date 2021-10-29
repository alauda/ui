export enum StepState {
  Default = 'default',
  Done = 'done',
  Error = 'error',
  Pending = 'pending',
}

export interface StepItem {
  label: string;
  description?: string;
  state: StepState;
  optional?: boolean;
  editable?: boolean;
}

export type StepsOrientation = 'horizontal' | 'vertical';

export class StepsSelection {
  selectedIndex: number;
  previousSelectedIndex: number;
  selectedStep: StepItem;
  previousSelectedStep: StepItem;
}
