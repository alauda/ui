export type NodeFilterFn = (filter: string, node: TreeNode) => boolean;

export interface TreeNode {
  label: string;
  value: unknown;
  children?: TreeNode[];
  disabled?: boolean;
  expanded?: boolean;
  icon?: string;
  expandedIcon?: string;
}
