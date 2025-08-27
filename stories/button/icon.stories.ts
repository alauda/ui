import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import IconComponent from './icon.component';

import { ButtonModule, IconModule } from '@alauda/ui';

const meta: Meta<IconComponent> = {
  title: 'Example/Button',
  component: IconComponent,
  decorators: [
    moduleMetadata({
      declarations: [IconComponent],
      imports: [ButtonModule, IconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Icon: Story = {
  name: 'Icon',
};
