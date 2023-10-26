import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { SelectBigDataComponent } from './big-data.component';

import { SelectModule } from '@alauda/ui';

const meta: Meta<SelectBigDataComponent> = {
  title: 'Example/Select',
  component: SelectBigDataComponent,
  decorators: [
    moduleMetadata({
      declarations: [SelectBigDataComponent],
      imports: [FormsModule, SelectModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<SelectBigDataComponent>;

export const BigData: Story = {
  name: 'BigData',
};
