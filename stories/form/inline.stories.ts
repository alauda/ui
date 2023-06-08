import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import FormInlineComponent from './inline.component';

import {
  ButtonModule,
  CheckboxModule,
  FormModule,
  IconModule,
  InputModule,
  RadioModule,
  SelectModule,
  SwitchModule,
} from '@alauda/ui';

const meta: Meta<FormInlineComponent> = {
  title: 'Example/Form',
  component: FormInlineComponent,
  decorators: [
    moduleMetadata({
      declarations: [FormInlineComponent],
      imports: [
        FormsModule,
        FormModule,
        InputModule,
        IconModule,
        SelectModule,
        ButtonModule,
        SwitchModule,
        RadioModule,
        CheckboxModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<FormInlineComponent>;

export const Inline: Story = {
  name: 'Inline',
};
