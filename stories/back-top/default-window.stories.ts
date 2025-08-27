import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DefaultWindowComponent from './default-window.component';

import { BackTopModule, ScrollingModule } from '@alauda/ui';

const meta: Meta<DefaultWindowComponent> = {
  title: 'Example/Back Top',
  component: DefaultWindowComponent,
  decorators: [
    moduleMetadata({
      declarations: [DefaultWindowComponent],
      imports: [BackTopModule, ScrollingModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<DefaultWindowComponent>;

export const DefaultWindow: Story = {
  name: 'Default Window',
};
