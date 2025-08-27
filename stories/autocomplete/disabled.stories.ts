import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { AutoCompleteDisabledComponent } from './disabled.component';

import { AutocompleteModule, InputModule } from '@alauda/ui';

const meta: Meta<AutoCompleteDisabledComponent> = {
  title: 'Example/Autocomplete',
  component: AutoCompleteDisabledComponent,
  decorators: [
    moduleMetadata({
      declarations: [AutoCompleteDisabledComponent],
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
type Story = StoryObj<AutoCompleteDisabledComponent>;

export const Disabled: Story = {
  name: 'Disabled',
};
