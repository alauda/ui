import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import IconBasicComponent from './basic.component';

import { ButtonModule, IconModule } from '@alauda/ui';

const meta: Meta<IconBasicComponent> = {
  title: 'Example/Icon',
  component: IconBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [IconBasicComponent],
      imports: [IconModule, ButtonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<IconBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
};
