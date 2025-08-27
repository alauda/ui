import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { SortComponent } from './sort.component';

import { SortModule } from '@alauda/ui';

const meta: Meta<SortComponent> = {
  title: 'Example/Sort',
  component: SortComponent,
  decorators: [
    moduleMetadata({
      imports: [SortModule],
      declarations: [SortComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<SortComponent>;

export const Sort: Story = {
  name: 'sort',
};
