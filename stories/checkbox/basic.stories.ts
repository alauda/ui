import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import CheckboxBasicComponent from './basic.component';

import { CheckboxModule } from '@alauda/ui';

const meta: Meta<CheckboxBasicComponent> = {
  title: 'Example/Checkbox',
  component: CheckboxBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [CheckboxBasicComponent],
      imports: [FormsModule, CheckboxModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CheckboxBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    type: 'label',
    disabled: false,
  },
};
