import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import {
  ConfirmContentComponent,
  ConfirmDialogComponent,
} from './confirm.component';

import { ButtonModule, DialogModule, IconModule } from '@alauda/ui';

const meta: Meta<ConfirmDialogComponent> = {
  title: 'Example/Dialog',
  component: ConfirmDialogComponent,
  decorators: [
    moduleMetadata({
      declarations: [ConfirmDialogComponent, ConfirmContentComponent],
      imports: [
        BrowserAnimationsModule,
        ButtonModule,
        DialogModule,
        IconModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ConfirmDialogComponent>;

export const Confirm: Story = {
  name: 'Confirm Dialog',
};
