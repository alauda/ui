import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import {
  DrawerContent1Component,
  DrawerContentComponent,
  ServiceDrawerCptComponent,
} from './service-drawer-cpt.component';

import { ButtonModule, DrawerModule } from '@alauda/ui';

const meta: Meta<ServiceDrawerCptComponent> = {
  title: 'Example/Drawer',
  component: ServiceDrawerCptComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonModule, DrawerModule, BrowserAnimationsModule],
      declarations: [
        ServiceDrawerCptComponent,
        DrawerContentComponent,
        DrawerContent1Component,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ServiceDrawerCptComponent>;

export const ServiceCptDrawer: Story = {
  name: 'service create component drawer',
};
