import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import ButtonGroupComponent from './group.component';

import { ButtonModule, IconModule } from '@alauda/ui';

const meta: Meta<ButtonGroupComponent> = {
  title: 'Example/Button',
  component: ButtonGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonGroupComponent],
      imports: [ButtonModule, IconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ButtonGroupComponent>;

export const Group: Story = {
  name: 'Button Group',
};
