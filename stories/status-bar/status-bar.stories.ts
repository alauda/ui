import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { StatusBarComponent } from './status-bar.component';

import { StatusBarModule } from '@alauda/ui';

const meta: Meta<StatusBarComponent> = {
  title: 'Example/Status Bar',
  component: StatusBarComponent,
  decorators: [
    moduleMetadata({
      imports: [StatusBarModule, BrowserAnimationsModule],
      declarations: [StatusBarComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<StatusBarComponent>;

export const StatusBar: Story = {
  name: 'status bar',
};
