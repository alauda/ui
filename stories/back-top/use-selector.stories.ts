import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import UseSelectorComponent from './use-selector.component';

import { BackTopModule, ScrollingModule } from '@alauda/ui';

const meta: Meta<UseSelectorComponent> = {
  title: 'Example/Back Top',
  component: UseSelectorComponent,
  decorators: [
    moduleMetadata({
      declarations: [UseSelectorComponent],
      imports: [BackTopModule, ScrollingModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<UseSelectorComponent>;

export const UseSelector: Story = {
  name: 'Use Selector',
};
