import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { PlaceholderComponent } from './placeholder.component';

import {
  ButtonModule,
  IconModule,
  ScrollingModule,
  SortModule,
  TableModule,
} from '@alauda/ui';

const meta: Meta<PlaceholderComponent> = {
  title: 'Example/Table',
  component: PlaceholderComponent,
  decorators: [
    moduleMetadata({
      declarations: [PlaceholderComponent],
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
type Story = StoryObj<PlaceholderComponent>;

export const Placeholder: Story = {
  name: 'Placeholder',
};
