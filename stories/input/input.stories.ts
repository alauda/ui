import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { InputComponent } from './input.component';

import { InputModule } from '@alauda/ui';

const meta: Meta<InputComponent> = {
  title: 'Example/Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      declarations: [InputComponent],
      imports: [InputModule, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Input: Story = {
  name: 'input',
};
