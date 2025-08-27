import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import ButtonBasicComponent from './basic.component';

import { ButtonModule, IconModule } from '@alauda/ui';

const meta: Meta<ButtonBasicComponent> = {
  title: 'Example/Button',
  component: ButtonBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonBasicComponent],
      imports: [ButtonModule, IconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ButtonBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    plain: false,
    round: false,
    disabled: false,
    loading: false,
    size: 'medium',
  },
};
