import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { PaletteComponent } from './palette.component';

import {
  ButtonModule,
  ColorPickerModule,
  FormModule,
  IconModule,
  InputModule,
  TooltipModule,
} from '@alauda/ui';

const meta: Meta<PaletteComponent> = {
  title: 'Example/Theme',
  component: PaletteComponent,
  decorators: [
    moduleMetadata({
      declarations: [PaletteComponent],
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
type Story = StoryObj<PaletteComponent>;

export const Palette: Story = {
  name: 'Palette',
};
