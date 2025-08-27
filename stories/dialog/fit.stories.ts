import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { FitViewportDialogComponent } from './fit.component';

import { ButtonModule, DialogModule, IconModule } from '@alauda/ui';

const meta: Meta<FitViewportDialogComponent> = {
  title: 'Example/Dialog',
  component: FitViewportDialogComponent,
  decorators: [
    moduleMetadata({
      declarations: [FitViewportDialogComponent],
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
type Story = StoryObj<FitViewportDialogComponent>;

export const Fit: Story = {
  name: 'Fit Viewport',
};
