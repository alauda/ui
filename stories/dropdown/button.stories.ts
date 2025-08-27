import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DropdownButtonComponent from './button.component';

import { ButtonModule, DropdownModule, IconModule } from '@alauda/ui';

const meta: Meta<DropdownButtonComponent> = {
  title: 'Example/Dropdown',
  component: DropdownButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [DropdownButtonComponent],
      imports: [
        ButtonModule,
        IconModule,
        DropdownModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DropdownButtonComponent>;

export const Button: Story = {
  name: 'Dropdown Button',
};
