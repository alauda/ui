import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TabsTitleComponent from './title.component';

import {
  ButtonModule,
  CardModule,
  FormModule,
  IconModule,
  RadioModule,
  TabsModule,
} from '@alauda/ui';

const meta: Meta<TabsTitleComponent> = {
  title: 'Example/Tabs',
  component: TabsTitleComponent,
  decorators: [
    moduleMetadata({
      declarations: [TabsTitleComponent],
      imports: [
        ButtonModule,
        IconModule,
        FormsModule,
        FormModule,
        RadioModule,
        TabsModule,
        CardModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TabsTitleComponent>;

export const Title: Story = {
  name: 'Title',
};
