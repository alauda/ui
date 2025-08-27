import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { StickyHeadersDemoComponent } from './sticky-header.component';

import {
  ButtonModule,
  IconModule,
  ScrollingModule,
  SortModule,
  TableModule,
} from '@alauda/ui';

const meta: Meta<StickyHeadersDemoComponent> = {
  title: 'Example/Table',
  component: StickyHeadersDemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [StickyHeadersDemoComponent],
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
type Story = StoryObj<StickyHeadersDemoComponent>;

export const StickyHeader: Story = {
  name: 'Sticky Header',
};
