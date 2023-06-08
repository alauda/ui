import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { RangeCustomFormatComponent } from './format.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<RangeCustomFormatComponent> = {
  title: 'Example/RangePicker',
  component: RangeCustomFormatComponent,
  decorators: [
    moduleMetadata({
      declarations: [RangeCustomFormatComponent],
      imports: [
        DatePickerModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<RangeCustomFormatComponent>;

export const CustomFormat: Story = {
  name: 'Custom format',
};
