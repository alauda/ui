import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { BasicDemoComponent } from './basic.component';

import {
  ButtonModule,
  MessageType,
  NOTIFICATION_CONFIG,
  NotificationModule,
} from '@alauda/ui';

const meta: Meta<BasicDemoComponent> = {
  title: 'Example/Notification',
  component: BasicDemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [BasicDemoComponent],
      imports: [NotificationModule, BrowserAnimationsModule, ButtonModule],
      providers: [
        {
          provide: NOTIFICATION_CONFIG,
          useValue: {
            duration: {
              [MessageType.Error]: 0,
              [MessageType.Success]: 3333,
              [MessageType.Warning]: 3333,
              [MessageType.Info]: 3333,
            },
            maxStack: 3,
          },
        },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<BasicDemoComponent>;

export const Basic: Story = {
  name: 'Basic',
};
