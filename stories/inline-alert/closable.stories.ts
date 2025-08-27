import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import InlineClosableComponent from './closable.component';

import { IconModule, InlineAlertModule } from '@alauda/ui';

const meta: Meta<InlineClosableComponent> = {
  title: 'Example/Inline Alert',
  component: InlineClosableComponent,
  decorators: [
    moduleMetadata({
      declarations: [InlineClosableComponent],
      imports: [InlineAlertModule, IconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<InlineClosableComponent>;

export const Closable: Story = {
  name: 'Closable',
};
