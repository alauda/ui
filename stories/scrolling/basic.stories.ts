import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import ScrollingBasicComponent from './basic.component';

import { FormModule, RadioModule, ScrollingModule } from '@alauda/ui';

const meta: Meta<ScrollingBasicComponent> = {
  title: 'Example/Scrolling',
  component: ScrollingBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [ScrollingBasicComponent],
      imports: [FormsModule, FormModule, RadioModule, ScrollingModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ScrollingBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
};
