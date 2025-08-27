import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TextComponent from './text.component';

import { ButtonModule, IconModule } from '@alauda/ui';

const meta: Meta<TextComponent> = {
  title: 'Example/Button',
  component: TextComponent,
  decorators: [
    moduleMetadata({
      declarations: [TextComponent],
      imports: [ButtonModule, IconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TextComponent>;

export const Text: Story = {
  name: 'Text',
};
