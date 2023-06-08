import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import InscrollComponent from './inscroll.component';

import { BackTopModule, ScrollingModule } from '@alauda/ui';

const meta: Meta<InscrollComponent> = {
  title: 'Example/Back Top',
  component: InscrollComponent,
  decorators: [
    moduleMetadata({
      declarations: [InscrollComponent],
      imports: [BackTopModule, ScrollingModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<InscrollComponent>;

export const Inscroll: Story = {
  name: 'inscroll',
};
