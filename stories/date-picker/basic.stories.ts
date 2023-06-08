import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DatePickerBasicComponent from './basic.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<DatePickerBasicComponent> = {
  title: 'Example/DatePicker',
  component: DatePickerBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [DatePickerBasicComponent],
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
type Story = StoryObj<DatePickerBasicComponent>;

export const Basic: Story = {
  name: 'Date Picker',
  args: {
    disabled: false,
  },
};
