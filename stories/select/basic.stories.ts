import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import SelectBasicComponent from './basic.component';

const meta: Meta<SelectBasicComponent> = {
  title: 'Example/Select',
  component: SelectBasicComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, SelectBasicComponent],
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
