import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DatePickerYearComponent from './year.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<DatePickerYearComponent> = {
  title: 'Example/DatePicker',
  component: DatePickerYearComponent,
  decorators: [
    moduleMetadata({
      declarations: [DatePickerYearComponent],
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
type Story = StoryObj<DatePickerYearComponent>;

export const YearPicker: Story = {
  name: 'Year Picker',
};
