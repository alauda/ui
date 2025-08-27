import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { ServiceDrawerComponent } from './service-drawer.component';

import { ButtonModule, DrawerModule } from '@alauda/ui';

const meta: Meta<ServiceDrawerComponent> = {
  title: 'Example/Drawer',
  component: ServiceDrawerComponent,
  decorators: [
    moduleMetadata({
      declarations: [ServiceDrawerComponent],
      imports: [ButtonModule, DrawerModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ServiceDrawerComponent>;

export const ServiceDrawer: Story = {
  name: 'service create drawer',
};
