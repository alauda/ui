import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DatePickerTodayComponent from './today.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<DatePickerTodayComponent> = {
  title: 'Example/DatePicker',
  component: DatePickerTodayComponent,
  decorators: [
    moduleMetadata({
      declarations: [DatePickerTodayComponent],
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
type Story = StoryObj<DatePickerTodayComponent>;

export const Today: Story = {
  name: 'Disable until today',
};
