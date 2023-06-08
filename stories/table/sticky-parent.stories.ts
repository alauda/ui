import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { StickyParentDemoComponent } from './sticky-parent.component';

import {
  ButtonModule,
  IconModule,
  ScrollingModule,
  SortModule,
  TableModule,
} from '@alauda/ui';

const meta: Meta<StickyParentDemoComponent> = {
  title: 'Example/Table',
  component: StickyParentDemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [StickyParentDemoComponent],
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
type Story = StoryObj<StickyParentDemoComponent>;

export const StickyParent: Story = {
  name: 'Sticky To Parent',
};
