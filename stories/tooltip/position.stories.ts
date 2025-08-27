import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TooltipPositionComponent from './position.component';

import { ButtonModule, TooltipModule } from '@alauda/ui';

const meta: Meta<TooltipPositionComponent> = {
  title: 'Example/Tooltip',
  component: TooltipPositionComponent,
  decorators: [
    moduleMetadata({
      declarations: [TooltipPositionComponent],
      imports: [TooltipModule, ButtonModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TooltipPositionComponent>;

export const Position: Story = {
  name: 'Position',
};
