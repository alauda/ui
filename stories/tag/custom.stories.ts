import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TagCustomComponent from './custom.component';

import { TagModule } from '@alauda/ui';

const meta: Meta<TagCustomComponent> = {
  title: 'Example/Tag',
  component: TagCustomComponent,
  decorators: [
    moduleMetadata({
      declarations: [TagCustomComponent],
      imports: [TagModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TagCustomComponent>;

export const Custom: Story = {
  name: 'Custom',
};
