import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import SelectGroupComponent from './group.component';

import { IconModule, SelectModule } from '@alauda/ui';

const meta: Meta<SelectGroupComponent> = {
  title: 'Example/Select',
  component: SelectGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [SelectGroupComponent],
      imports: [FormsModule, SelectModule, IconModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<SelectGroupComponent>;

export const Group: Story = {
  name: 'Group',
};
