import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import ColorPickerComponent from './color-picker.component';

import { ColorPickerModule } from '@alauda/ui';

const meta: Meta<ColorPickerComponent> = {
  title: 'Example/ColorPicker',
  component: ColorPickerComponent,
  render: args => ({ props: args }),
  decorators: [
    moduleMetadata({
      declarations: [ColorPickerComponent],
      imports: [ColorPickerModule, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ColorPickerComponent>;

export const colorPicker: Story = {
  name: 'color-picker',
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `
<aui-color-picker [(ngModel)]="value"></aui-color-picker>
<br />
{{ value }}
      `,
      },
    },
  },
};
