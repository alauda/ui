import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { RangeDisableSomeYearComponent } from './disable-some-year.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<RangeDisableSomeYearComponent> = {
  title: 'Example/RangePicker',
  component: RangeDisableSomeYearComponent,
  decorators: [
    moduleMetadata({
      declarations: [RangeDisableSomeYearComponent],
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
type Story = StoryObj<RangeDisableSomeYearComponent>;

export const DisableSomeYear: Story = {
  name: 'Disable some Year',
};
