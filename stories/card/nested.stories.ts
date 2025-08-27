import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import CardNestedComponent from './nested.component';

import { CardModule } from '@alauda/ui';

const meta: Meta<CardNestedComponent> = {
  title: 'Example/Card',
  component: CardNestedComponent,
  decorators: [
    moduleMetadata({
      declarations: [CardNestedComponent],
      imports: [CardModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CardNestedComponent>;

export const Nested: Story = {
  name: 'Nested',
};
