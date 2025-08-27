import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { GlobalStyleComponent } from './global-style.component';

import { IconModule, TooltipModule } from '@alauda/ui';

const meta: Meta<GlobalStyleComponent> = {
  title: 'Example/Pattern',
  component: GlobalStyleComponent,
  decorators: [
    moduleMetadata({
      imports: [IconModule, TooltipModule, BrowserAnimationsModule],
      declarations: [GlobalStyleComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<GlobalStyleComponent>;

export const GlobalStyle: Story = {
  name: 'global style',
};
