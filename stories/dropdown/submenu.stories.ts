import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DropdownSubmenuComponent from './submenu.component';

import { ButtonModule, DropdownModule, IconModule } from '@alauda/ui';

const meta: Meta<DropdownSubmenuComponent> = {
  title: 'Example/Dropdown',
  component: DropdownSubmenuComponent,
  decorators: [
    moduleMetadata({
      declarations: [DropdownSubmenuComponent],
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
type Story = StoryObj<DropdownSubmenuComponent>;

export const Submenu: Story = {
  name: 'Submenu',
};
