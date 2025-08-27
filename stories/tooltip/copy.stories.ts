import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TooltipCopyComponent from './copy.component';

import { ButtonModule, TooltipModule } from '@alauda/ui';

const meta: Meta<TooltipCopyComponent> = {
  title: 'Example/Tooltip',
  component: TooltipCopyComponent,
  decorators: [
    moduleMetadata({
      declarations: [TooltipCopyComponent],
      imports: [TooltipModule, ButtonModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TooltipCopyComponent>;

export const Copy: Story = {
  name: 'Copy',
};
