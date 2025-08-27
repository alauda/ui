import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import UseElementRefComponent from './element-ref.component';

import { BackTopModule, ScrollingModule } from '@alauda/ui';

const meta: Meta<UseElementRefComponent> = {
  title: 'Example/Back Top',
  component: UseElementRefComponent,
  decorators: [
    moduleMetadata({
      declarations: [UseElementRefComponent],
      imports: [BackTopModule, ScrollingModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<UseElementRefComponent>;

export const UseElementRef: Story = {
  name: 'Use Element Ref',
};
