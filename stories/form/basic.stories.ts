import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import FormBasicComponent from './basic.component';

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

const meta: Meta<FormBasicComponent> = {
  title: 'Example/Form',
  component: FormBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [FormBasicComponent],
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
type Story = StoryObj<FormBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
};
