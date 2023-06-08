import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { RangeBasicComponent } from './basic.component';

import { ButtonModule, DatePickerModule } from '@alauda/ui';

const meta: Meta<RangeBasicComponent> = {
  title: 'Example/RangePicker',
  component: RangeBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [RangeBasicComponent],
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
type Story = StoryObj<RangeBasicComponent>;

export const Basic: Story = {
  name: 'Range Picker',
};
