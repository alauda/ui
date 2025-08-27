import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DatePickerWithoutTimeComponent from './foot.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<DatePickerWithoutTimeComponent> = {
  title: 'Example/DatePicker',
  component: DatePickerWithoutTimeComponent,
  decorators: [
    moduleMetadata({
      declarations: [DatePickerWithoutTimeComponent],
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
type Story = StoryObj<DatePickerWithoutTimeComponent>;

export const ExtraFooter: Story = {
  name: 'Extra footer',
};
