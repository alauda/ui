import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import AccordionBasicComponent from './basic.component';

import { AccordionModule } from '@alauda/ui';

const meta: Meta<AccordionBasicComponent> = {
  title: 'Example/Accordion',
  component: AccordionBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [AccordionBasicComponent],
      imports: [BrowserAnimationsModule, AccordionModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<AccordionBasicComponent>;

export const Basic: Story = {
  name: 'accordion',
  args: {
    multi: true,
    background: false,
  },
};
