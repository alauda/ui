import { ReactiveFormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { TagsInputComponent } from './tags-input.component';

import { InputModule } from '@alauda/ui';

const meta: Meta<TagsInputComponent> = {
  title: 'Example/Input',
  component: TagsInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [TagsInputComponent],
      imports: [InputModule, ReactiveFormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TagsInputComponent>;

export const TagsInput: Story = {
  name: 'tags input',
};
