import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import CardBasicComponent from './basic.component';

import { CardModule } from '@alauda/ui';

const meta: Meta<CardBasicComponent> = {
  title: 'Example/Card',
  component: CardBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [CardBasicComponent],
      imports: [CardModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CardBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    divider: true,
  },
};
