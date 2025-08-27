import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import SelectMultipleComponent from './multiple.component';

import { IconModule, SelectModule } from '@alauda/ui';

const meta: Meta<SelectMultipleComponent> = {
  title: 'Example/Select',
  component: SelectMultipleComponent,
  decorators: [
    moduleMetadata({
      declarations: [SelectMultipleComponent],
      imports: [FormsModule, SelectModule, IconModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<SelectMultipleComponent>;

export const Multiple: Story = {
  name: 'Multiple',
};
