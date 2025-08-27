import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { InputGroupComponent } from './input-group.component';

import { IconModule, InputModule } from '@alauda/ui';

const meta: Meta<InputGroupComponent> = {
  title: 'Example/Input',
  component: InputGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [InputGroupComponent],
      imports: [InputModule, IconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<InputGroupComponent>;

export const InputGroup: Story = {
  name: 'input group',
  args: {
    disabled: true,
  },
};
