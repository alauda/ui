import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { AutoCompleteBasicComponent } from './basic.component';

import { AutocompleteModule, InputModule } from '@alauda/ui';

const meta: Meta<AutoCompleteBasicComponent> = {
  title: 'Example/Autocomplete',
  component: AutoCompleteBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [AutoCompleteBasicComponent],
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
type Story = StoryObj<AutoCompleteBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
};
