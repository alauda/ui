import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TabsEditableComponent from './editable.component';

import {
  ButtonModule,
  CardModule,
  FormModule,
  IconModule,
  RadioModule,
  TabsModule,
} from '@alauda/ui';

const meta: Meta<TabsEditableComponent> = {
  title: 'Example/Tabs',
  component: TabsEditableComponent,
  decorators: [
    moduleMetadata({
      declarations: [TabsEditableComponent],
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
type Story = StoryObj<TabsEditableComponent>;

export const Editable: Story = {
  name: 'Editable',
};
