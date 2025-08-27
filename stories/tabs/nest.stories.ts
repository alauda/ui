import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { ActiveTestComponent } from './active-test.component';
import TabsNestComponent from './nest.component';

import {
  ButtonModule,
  CardModule,
  FormModule,
  IconModule,
  RadioModule,
  TabsModule,
} from '@alauda/ui';

const meta: Meta<TabsNestComponent> = {
  title: 'Example/Tabs',
  component: TabsNestComponent,
  decorators: [
    moduleMetadata({
      declarations: [TabsNestComponent, ActiveTestComponent],
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
type Story = StoryObj<TabsNestComponent>;

export const Nest: Story = {
  name: 'Nest',
};
