import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import WindowScrollerComponent from './window-scroller.component';

import { AnchorModule, ScrollingModule } from '@alauda/ui';

const meta: Meta<WindowScrollerComponent> = {
  title: 'Example/Anchor',
  component: WindowScrollerComponent,
  decorators: [
    moduleMetadata({
      declarations: [WindowScrollerComponent],
      imports: [ScrollingModule, AnchorModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<WindowScrollerComponent>;

export const WindowScroller: Story = {
  name: 'Window Scroller',
};
