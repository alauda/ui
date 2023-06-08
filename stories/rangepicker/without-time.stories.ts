import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { RangeWithoutTimeComponent } from './without-time.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<RangeWithoutTimeComponent> = {
  title: 'Example/RangePicker',
  component: RangeWithoutTimeComponent,
  decorators: [
    moduleMetadata({
      declarations: [RangeWithoutTimeComponent],
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
type Story = StoryObj<RangeWithoutTimeComponent>;

export const WithoutTime: Story = {
  name: 'Without time',
};
