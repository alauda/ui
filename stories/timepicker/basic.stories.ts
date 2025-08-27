import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TimePickerBasicComponent from './basic.component';

import { TimePickerModule } from '@alauda/ui';

const meta: Meta<TimePickerBasicComponent> = {
  title: 'Example/TimePicker',
  component: TimePickerBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [TimePickerBasicComponent],
      imports: [
        TimePickerModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TimePickerBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    size: 'medium',
    disabled: false,
  },
};
