import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DropdownTemplateComponent from './template.component';

import { ButtonModule, DropdownModule, IconModule } from '@alauda/ui';

const meta: Meta<DropdownTemplateComponent> = {
  title: 'Example/Dropdown',
  component: DropdownTemplateComponent,
  decorators: [
    moduleMetadata({
      declarations: [DropdownTemplateComponent],
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
type Story = StoryObj<DropdownTemplateComponent>;

export const Template: Story = {
  name: 'Menu Template',
};
