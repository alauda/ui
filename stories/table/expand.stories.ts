import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { ExpandDemoComponent } from './expand.component';

import {
  ButtonModule,
  IconModule,
  ScrollingModule,
  SortModule,
  TableModule,
} from '@alauda/ui';

const meta: Meta<ExpandDemoComponent> = {
  title: 'Example/Table',
  component: ExpandDemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [ExpandDemoComponent],
      imports: [
        BrowserAnimationsModule,
        SortModule,
        IconModule,
        ScrollingModule,
        TableModule,
        ButtonModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ExpandDemoComponent>;

export const Expand: Story = {
  name: 'Expand',
};
