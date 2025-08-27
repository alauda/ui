import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { RangeDisableSomeDayComponent } from './disable-some-day.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<RangeDisableSomeDayComponent> = {
  title: 'Example/RangePicker',
  component: RangeDisableSomeDayComponent,
  decorators: [
    moduleMetadata({
      declarations: [RangeDisableSomeDayComponent],
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
type Story = StoryObj<RangeDisableSomeDayComponent>;

export const DisableSomeDay: Story = {
  name: 'Disable some day',
};
