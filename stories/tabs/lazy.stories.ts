import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { LazyTestComponent } from './lazy-test.component';
import TabsLazyComponent from './lazy.component';

import {
  ButtonModule,
  CardModule,
  FormModule,
  IconModule,
  RadioModule,
  TabsModule,
} from '@alauda/ui';

const meta: Meta<TabsLazyComponent> = {
  title: 'Example/Tabs',
  component: TabsLazyComponent,
  decorators: [
    moduleMetadata({
      declarations: [TabsLazyComponent, LazyTestComponent],
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
type Story = StoryObj<TabsLazyComponent>;

export const Lazy: Story = {
  name: 'Lazy',
};
