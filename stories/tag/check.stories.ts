import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TagCheckComponent from './check.component';

import {
  CheckboxModule,
  IconModule,
  RadioModule,
  SwitchModule,
  TagModule,
} from '@alauda/ui';

const meta: Meta<TagCheckComponent> = {
  title: 'Example/Tag',
  component: TagCheckComponent,
  decorators: [
    moduleMetadata({
      declarations: [TagCheckComponent],
      imports: [
        TagModule,
        SwitchModule,
        RadioModule,
        FormsModule,
        IconModule,
        CheckboxModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TagCheckComponent>;

export const Check: Story = {
  name: 'Check',
};
