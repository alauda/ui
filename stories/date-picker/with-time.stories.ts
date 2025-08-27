import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DatePickerWithTimeComponent from './with-time.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<DatePickerWithTimeComponent> = {
  title: 'Example/DatePicker',
  component: DatePickerWithTimeComponent,
  decorators: [
    moduleMetadata({
      declarations: [DatePickerWithTimeComponent],
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
type Story = StoryObj<DatePickerWithTimeComponent>;

export const WithTime: Story = {
  name: 'With time',
};
