import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import CheckboxGroupComponent from './group.component';

import { CheckboxModule } from '@alauda/ui';

const meta: Meta<CheckboxGroupComponent> = {
  title: 'Example/Checkbox',
  component: CheckboxGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [CheckboxGroupComponent],
      imports: [FormsModule, CheckboxModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CheckboxGroupComponent>;

export const Group: Story = {
  name: 'Group',
  args: {
    direction: 'row',
  },
};
