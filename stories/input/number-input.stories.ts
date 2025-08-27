import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { numberInputComponent } from './number-input.component';

import { InputModule } from '@alauda/ui';

const meta: Meta<numberInputComponent> = {
  title: 'Example/Input',
  component: numberInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [numberInputComponent],
      imports: [InputModule, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<numberInputComponent>;

export const NumberInput: Story = {
  name: 'number input',
};
