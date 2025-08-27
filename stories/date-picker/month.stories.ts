import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DatePickerMonthComponent from './month.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<DatePickerMonthComponent> = {
  title: 'Example/DatePicker',
  component: DatePickerMonthComponent,
  decorators: [
    moduleMetadata({
      declarations: [DatePickerMonthComponent],
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
type Story = StoryObj<DatePickerMonthComponent>;

export const MonthPicker: Story = {
  name: 'Month Picker',
};
