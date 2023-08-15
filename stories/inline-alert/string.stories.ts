import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import InlineStringComponent from './string.component';

import { IconModule, InlineAlertModule } from '@alauda/ui';

const meta: Meta<InlineStringComponent> = {
  title: 'Example/Inline Alert',
  component: InlineStringComponent,
  decorators: [
    moduleMetadata({
      declarations: [InlineStringComponent],
      imports: [InlineAlertModule, IconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<InlineStringComponent>;

// eslint-disable-next-line sonar/no-globals-shadowing
export const String: Story = {
  name: 'String',
};
