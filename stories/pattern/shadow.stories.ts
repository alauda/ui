import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { ShadowComponent } from './shadow.component';

const meta: Meta<ShadowComponent> = {
  title: 'Example/Pattern',
  component: ShadowComponent,
  decorators: [
    moduleMetadata({
      declarations: [ShadowComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ShadowComponent>;

export const Shadow: Story = {
  name: 'shadow',
};
