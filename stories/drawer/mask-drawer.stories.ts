import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { MaskDrawerComponent } from './mask-drawer.component';

import { ButtonModule, DrawerModule } from '@alauda/ui';

const meta: Meta<MaskDrawerComponent> = {
  title: 'Example/Drawer',
  component: MaskDrawerComponent,
  decorators: [
    moduleMetadata({
      declarations: [MaskDrawerComponent],
      imports: [ButtonModule, DrawerModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<MaskDrawerComponent>;

export const MaskDrawer: Story = {
  name: 'mask drawer',
};
