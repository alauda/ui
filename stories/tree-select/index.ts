import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { TreeNode, TreeSelectModule } from '@alauda/ui';

const TREE_NODES: TreeNode[] = [
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
        label: 'c-1',
        value: 'c-1',
        icon: 'file',
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

storiesOf('TreeSelect', module)
  .addDecorator(withKnobs)
  .add('tree select', () => {
    const treeNodes = TREE_NODES;
    const value = 'b-1';

    const filterable = boolean('filterable', true);
    const clearable = boolean('clearable', true);
    const disabled = boolean('disabled', false);
    const loading = boolean('loading', false);
    const placeholder = text('placeholder', 'placeholder');
    const leafOnly = boolean('leafOnly', false);
    return {
      moduleMetadata: {
        imports: [FormsModule, TreeSelectModule, BrowserAnimationsModule],
      },
      template: /* HTML */ `
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
      props: {
        treeNodes,
        value,
        clearable,
        filterable,
        disabled,
        loading,
        placeholder,
        leafOnly,
      },
    };
  });
