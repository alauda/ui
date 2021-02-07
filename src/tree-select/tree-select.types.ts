import { SelectPrimitiveValue } from '../select/select.types';

export type NodeFilterFn<T> = (filter: string, node: TreeNode<T>) => boolean;

export interface TreeNode<T = SelectPrimitiveValue> {
  label: string;
  value: T;
  children?: Array<TreeNode<T>>;
  disabled?: boolean;
  expanded?: boolean;
  icon?: string;
  expandedIcon?: string;
}
