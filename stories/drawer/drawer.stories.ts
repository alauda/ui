import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  DemoComponent,
  MaskDrawerComponent,
  ServiceDrawerComponent,
  ServiceDrawerCptComponent,
} from './components';
import {
  ButtonModule,
  DrawerModule,
  InputModule,
  SwitchModule,
} from '@alauda/ui';
import { FormsModule } from '@angular/forms';

const meta: Meta = {
  title: 'Drawer',
  decorators: [
    moduleMetadata({
      declarations: [
        DemoComponent,
        MaskDrawerComponent,
        ServiceDrawerComponent,
        ServiceDrawerCptComponent,
      ],
      imports: [
        ButtonModule,
        DrawerModule,
        InputModule,
        FormsModule,
        SwitchModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const drawer: Story = {
  name: 'drawer',
  render: () => ({
    template: `
    <drawer-demo></drawer-demo>
      `,
  }),
};
export const maskDrawer: Story = {
  name: 'mask-drawer-demo',
  render: () => ({
    template: `
    <mask-drawer-demo></mask-drawer-demo>
      `,
  }),
};

export const serviceDrawer: Story = {
  name: 'service create drawer',
  render: () => ({
    template: `
    <service-drawer-demo></service-drawer-demo>
      `,
  }),
};

export const serviceDrawerCpt: Story = {
  name: 'service create component drawer',
  render: () => ({
    template: `
    <service-drawer-cpt-demo></service-drawer-cpt-demo>
      `,
  }),
};
