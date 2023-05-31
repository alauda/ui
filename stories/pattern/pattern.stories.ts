import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { IconModule, TooltipModule } from '@alauda/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalStyleComponent } from './global-style/global-style.component';
import { ShadowComponent } from './shadow/shadow.component';

const meta: Meta = {
  title: 'Patter',
  decorators: [
    moduleMetadata({
      declarations: [ShadowComponent, GlobalStyleComponent],
      imports: [IconModule, TooltipModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const globalStyle: Story = {
  name: 'global style',
  render: () => ({
    template: `
    <global-style-demo></global-style-demo>
      `,
  }),
};

export const shadow: Story = {
  name: 'shadow',
  render: () => ({
    template: `
      <shadow-demo></shadow-demo>
        `,
  }),
};
