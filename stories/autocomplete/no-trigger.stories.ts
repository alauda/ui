import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { AutoCompleteNoTriggerComponent } from './no-trigger.component';

import { AutocompleteModule, InputModule } from '@alauda/ui';

const meta: Meta<AutoCompleteNoTriggerComponent> = {
  title: 'Example/Autocomplete',
  component: AutoCompleteNoTriggerComponent,
  decorators: [
    moduleMetadata({
      declarations: [AutoCompleteNoTriggerComponent],
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
type Story = StoryObj<AutoCompleteNoTriggerComponent>;

export const NoTrigger: Story = {
  name: 'No Trigger',
};
