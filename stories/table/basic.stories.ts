import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TableBasicComponent from './basic.component';

import {
  ButtonModule,
  IconModule,
  ScrollingModule,
  SortModule,
  TableModule,
} from '@alauda/ui';

const meta: Meta<TableBasicComponent> = {
  title: 'Example/Table',
  component: TableBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [TableBasicComponent],
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
type Story = StoryObj<TableBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
};
