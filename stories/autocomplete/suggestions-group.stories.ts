import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { AutoCompleteSuggestionsGroupComponent } from './suggestions-group.component';

import { AutocompleteModule, InputModule } from '@alauda/ui';

const meta: Meta<AutoCompleteSuggestionsGroupComponent> = {
  title: 'Example/Autocomplete',
  component: AutoCompleteSuggestionsGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [AutoCompleteSuggestionsGroupComponent],
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
type Story = StoryObj<AutoCompleteSuggestionsGroupComponent>;

export const SuggestionsGroup: Story = {
  name: 'Suggestions Group',
};
