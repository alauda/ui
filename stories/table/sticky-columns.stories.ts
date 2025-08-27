import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { StickyColumnsDemoComponent } from './sticky-columns.component';

import {
  ButtonModule,
  IconModule,
  ScrollingModule,
  SortModule,
  TableColumnResizableDirective,
  TableModule,
} from '@alauda/ui';

const meta: Meta<StickyColumnsDemoComponent> = {
  title: 'Example/Table',
  component: StickyColumnsDemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [StickyColumnsDemoComponent],
      imports: [
        BrowserAnimationsModule,
        SortModule,
        IconModule,
        ScrollingModule,
        TableModule,
        ButtonModule,
        TableColumnResizableDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<StickyColumnsDemoComponent>;

export const StickyColumns: Story = {
  name: 'Sticky Columns',
};
