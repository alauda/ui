import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TreeSelect from './tree-select.component';

import { TreeSelectModule } from '@alauda/ui';

const meta: Meta<TreeSelect> = {
  title: 'Example/TreeSelect',
  component: TreeSelect,
  render: args => ({ props: args }),
  decorators: [
    moduleMetadata({
      declarations: [TreeSelect],
      imports: [FormsModule, TreeSelectModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TreeSelect>;

export const treeSelect: Story = {
  name: 'tree select',
  args: {
    filterable: true,
    clearable: true,
    disabled: false,
    loading: false,
    placeholder: 'placeholder',
    leafOnly: false,
  },
};
