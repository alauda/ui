import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DropdownBasicComponent from './basic.component';

import { ButtonModule, DropdownModule, IconModule } from '@alauda/ui';

const meta: Meta<DropdownBasicComponent> = {
  title: 'Example/Dropdown',
  component: DropdownBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [DropdownBasicComponent],
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
type Story = StoryObj<DropdownBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
};
