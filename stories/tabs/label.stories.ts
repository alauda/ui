import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TabsLabelComponent from './label.component';

import {
  ButtonModule,
  CardModule,
  FormModule,
  IconModule,
  RadioModule,
  TabsModule,
} from '@alauda/ui';

const meta: Meta<TabsLabelComponent> = {
  title: 'Example/Tabs',
  component: TabsLabelComponent,
  decorators: [
    moduleMetadata({
      declarations: [TabsLabelComponent],
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
type Story = StoryObj<TabsLabelComponent>;

export const Label: Story = {
  name: 'CustomLabel',
};
