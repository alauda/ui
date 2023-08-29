import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { ButtonModule, DatePickerModule } from '@alauda/ui';
import DatePickerWithMaxAndMinComponent from './with-max-min-date.component';

const meta: Meta<DatePickerWithMaxAndMinComponent> = {
  title: 'Example/DatePicker',
  component: DatePickerWithMaxAndMinComponent,
  decorators: [
    moduleMetadata({
      declarations: [DatePickerWithMaxAndMinComponent],
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
type Story = StoryObj<DatePickerWithMaxAndMinComponent>;

export const WithMaxMinDate: Story = {
  name: 'Date Picker With Max and Min Date',
};
