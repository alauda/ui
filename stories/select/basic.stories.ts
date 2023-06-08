import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import SelectBasicComponent from './basic.component';

import { IconModule, SelectModule } from '@alauda/ui';

const meta: Meta<SelectBasicComponent> = {
  title: 'Example/Select',
  component: SelectBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [SelectBasicComponent],
      imports: [FormsModule, SelectModule, IconModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<SelectBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    disabled: false,
    loading: false,
    clearable: false,
    filterable: true,
  },
};
