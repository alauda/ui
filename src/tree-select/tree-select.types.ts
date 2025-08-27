export type NodeFilterFn<T> = (filter: string, node: TreeNode<T>) => boolean;

export interface TreeNode<T = unknown> {
  label: string;
  value: T;
  children?: Array<TreeNode<T>>;
  disabled?: boolean;
  expanded?: boolean;
  icon?: string;
  expandedIcon?: string;
  loading?: boolean;
}
