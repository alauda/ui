import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import InlineTypeComponent from './type.component';

import { IconModule, InlineAlertModule } from '@alauda/ui';

const meta: Meta<InlineTypeComponent> = {
  title: 'Example/Inline Alert',
  component: InlineTypeComponent,
  decorators: [
    moduleMetadata({
      declarations: [InlineTypeComponent],
      imports: [InlineAlertModule, IconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<InlineTypeComponent>;

export const Type: Story = {
  name: 'Type',
};
