import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import InlineBasicComponent from './basic.component';

import { IconModule, InlineAlertModule } from '@alauda/ui';

const meta: Meta<InlineBasicComponent> = {
  title: 'Example/Inline Alert',
  component: InlineBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [InlineBasicComponent],
      imports: [InlineAlertModule, IconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<InlineBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
};
