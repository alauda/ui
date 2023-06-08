import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DropdownGroupComponent from './group.component';

import { ButtonModule, DropdownModule, IconModule } from '@alauda/ui';

const meta: Meta<DropdownGroupComponent> = {
  title: 'Example/Dropdown',
  component: DropdownGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [DropdownGroupComponent],
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
type Story = StoryObj<DropdownGroupComponent>;

export const Group: Story = {
  name: 'Group',
};
