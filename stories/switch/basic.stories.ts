import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import SwitchBasicComponent from './basic.component';

import { SwitchModule } from '@alauda/ui';

const meta: Meta<SwitchBasicComponent> = {
  title: 'Example/Switch',
  component: SwitchBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [SwitchBasicComponent],
      imports: [SwitchModule, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<SwitchBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    disabled: false,
    loading: false,
  },
};
