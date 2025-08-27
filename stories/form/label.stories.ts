import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import DropdownLabelComponent from './label.component';

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

const meta: Meta<DropdownLabelComponent> = {
  title: 'Example/Form',
  component: DropdownLabelComponent,
  decorators: [
    moduleMetadata({
      declarations: [DropdownLabelComponent],
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
type Story = StoryObj<DropdownLabelComponent>;

export const Label: Story = {
  name: 'Label top',
};
