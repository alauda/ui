import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { AutoCompleteNotFirstComponent } from './not-first.component';

import { AutocompleteModule, InputModule } from '@alauda/ui';

const meta: Meta<AutoCompleteNotFirstComponent> = {
  title: 'Example/Autocomplete',
  component: AutoCompleteNotFirstComponent,
  decorators: [
    moduleMetadata({
      declarations: [AutoCompleteNotFirstComponent],
      imports: [
        AutocompleteModule,
        InputModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<AutoCompleteNotFirstComponent>;

export const NotFirst: Story = {
  name: 'Not First',
};
