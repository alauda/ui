import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { SortDemoComponent } from './sort.component';

import {
  ButtonModule,
  IconModule,
  ScrollingModule,
  SortModule,
  TableModule,
} from '@alauda/ui';

const meta: Meta<SortDemoComponent> = {
  title: 'Example/Table',
  component: SortDemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [SortDemoComponent],
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
type Story = StoryObj<SortDemoComponent>;

export const Sort: Story = {
  name: 'Sort',
};
