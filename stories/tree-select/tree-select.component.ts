import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TreeNode } from '@alauda/ui';

@Component({
  selector: 'tree-select',
  template: `
    {{ value | json }}
    <aui-tree-select
      [(value)]="value"
      [nodesData]="treeNodes"
      [disabled]="disabled"
      [loading]="loading"
      [clearable]="clearable"
      [filterable]="filterable"
      [placeholder]="placeholder"
      [leafOnly]="leafOnly"
    >
      <aui-tree-node-placeholder>None</aui-tree-node-placeholder>
    </aui-tree-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TreeSelectComponent {
  /**
   * 输入框是可过滤
   */
  @Input()
  filterable = true;

  /**
   * 输入框可清除
   */
  @Input()
  clearable = true;

  /**
   * 输入框disabled
   */
  @Input()
  disabled = false;

  /**
   * loading 状态
   */
  @Input()
  loading = false;

  @Input()
  placeholder = 'placeholder';

  @Input()
  leafOnly = false;

  value = 'b-1';

  treeNodes: TreeNode[] = [
    {
      label: 'a',
      value: 'a',
      expanded: false,
      children: [
        {
          label: 'a-1',
          value: 'a-1',
        },
        {
          label: 'a-2',
          value: 'a-2',
          children: [
            {
              label: 'a-2-1',
              value: 'a-2-1',
            },
          ],
        },
        { label: 'a-3', value: 'a-3', disabled: true },
        {
          label: 'a-4',
          value: 'a-4',
          disabled: true,
          children: [
            {
              label: 'a-4-1',
              value: 'a-4-1',
            },
          ],
        },
      ],
    },
    {
      label: 'b',
      value: 'b',
      expanded: true,
      children: [
        {
          label: 'b-1',
          value: 'b-1',
        },
        {
          label: 'b-2',
          value: 'b-2',
        },
        {
          label: 'b-3',
          value: 'b-3',
        },
        {
          label: 'b-4',
          value: 'b-4',
        },
      ],
    },
    {
      label: 'c',
      value: 'c',
      expanded: true,
      icon: 'folder',
      expandedIcon: 'folder_open',
      children: [
        {
          label: 'c-0',
          value: 'c-0',
          icon: 'folder',
          children: [
            {
              label: 'c-0-1',
              value: 'c-0-1',
              icon: 'file',
            },
            {
              label: 'c-0-2',
              value: 'c-0-2',
              icon: 'file',
            },
          ],
        },
        {
          label: 'c-1',
          value: 'c-1',
          icon: 'folder',
        },
        {
          label: 'c-2',
          value: 'c-2',
          icon: 'file',
        },
        
      ],
    },
    {
      label: 'd',
      value: 'd',
      expanded: true,
      icon: 'file',
      loading: true,
      children: [],
    },
  ];
}
