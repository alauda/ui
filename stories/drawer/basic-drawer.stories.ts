import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { BasicDrawerComponent } from './basic-drawer.component';

import {
  ButtonModule,
  DrawerModule,
  InputModule,
  SwitchModule,
} from '@alauda/ui';

const meta: Meta<BasicDrawerComponent> = {
  title: 'Example/Drawer',
  component: BasicDrawerComponent,
  decorators: [
    moduleMetadata({
      declarations: [BasicDrawerComponent],
      imports: [
        ButtonModule,
        DrawerModule,
        InputModule,
        FormsModule,
        SwitchModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<BasicDrawerComponent>;

export const BasicDrawer: Story = {
  name: 'drawer',
};
