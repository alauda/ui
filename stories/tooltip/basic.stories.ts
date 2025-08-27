import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TooltipBasicComponent from './basic.component';

import { ButtonModule, TooltipModule } from '@alauda/ui';

const meta: Meta<TooltipBasicComponent> = {
  title: 'Example/Tooltip',
  component: TooltipBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [TooltipBasicComponent],
      imports: [TooltipModule, ButtonModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TooltipBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
};
