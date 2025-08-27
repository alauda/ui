import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { RangeDisabledComponent } from './disabled.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<RangeDisabledComponent> = {
  title: 'Example/RangePicker',
  component: RangeDisabledComponent,
  decorators: [
    moduleMetadata({
      declarations: [RangeDisabledComponent],
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
type Story = StoryObj<RangeDisabledComponent>;

export const Disabled: Story = {
  name: 'Disabled',
};
