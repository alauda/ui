import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TagIconComponent from './icon.component';

import { IconModule, TagModule } from '@alauda/ui';

const meta: Meta<TagIconComponent> = {
  title: 'Example/Tag',
  component: TagIconComponent,
  decorators: [
    moduleMetadata({
      declarations: [TagIconComponent],
      imports: [TagModule, IconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TagIconComponent>;

export const Icon: Story = {
  name: 'Icon',
};
