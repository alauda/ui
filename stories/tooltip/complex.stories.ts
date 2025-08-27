import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TooltipComplexComponent from './complex.component';

import { ButtonModule, TooltipModule } from '@alauda/ui';

const meta: Meta<TooltipComplexComponent> = {
  title: 'Example/Tooltip',
  component: TooltipComplexComponent,
  decorators: [
    moduleMetadata({
      declarations: [TooltipComplexComponent],
      imports: [TooltipModule, ButtonModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TooltipComplexComponent>;

export const Complex: Story = {
  name: 'Complex Content',
};
