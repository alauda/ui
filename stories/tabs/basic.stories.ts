import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TabsBasicComponent from './basic.component';

import {
  ButtonModule,
  CardModule,
  FormModule,
  IconModule,
  RadioModule,
  TabsModule,
} from '@alauda/ui';

const meta: Meta<TabsBasicComponent> = {
  title: 'Example/Tabs',
  component: TabsBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [TabsBasicComponent],
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
type Story = StoryObj<TabsBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    type: 'line',
    size: 'medium',
    disabled: false,
  },
};
