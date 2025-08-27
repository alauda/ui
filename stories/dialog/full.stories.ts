import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { FullScreenDialogComponent } from './full.component';

import { ButtonModule, DialogModule, IconModule } from '@alauda/ui';

const meta: Meta<FullScreenDialogComponent> = {
  title: 'Example/Dialog',
  component: FullScreenDialogComponent,
  decorators: [
    moduleMetadata({
      declarations: [FullScreenDialogComponent],
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
type Story = StoryObj<FullScreenDialogComponent>;

export const Full: Story = {
  name: 'Full Screen',
};
