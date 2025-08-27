import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { CustomizeComponent } from './customize.component';

import {
  ButtonModule,
  ColorPickerModule,
  FormModule,
  IconModule,
  InputModule,
  TooltipModule,
} from '@alauda/ui';

const meta: Meta<CustomizeComponent> = {
  title: 'Example/Theme',
  component: CustomizeComponent,
  decorators: [
    moduleMetadata({
      declarations: [CustomizeComponent],
      imports: [
        CommonModule,
        ButtonModule,
        ColorPickerModule,
        IconModule,
        InputModule,
        FormModule,
        TooltipModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<CustomizeComponent>;

export const Customize: Story = {
  name: 'Customize',
};
