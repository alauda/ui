import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import RadioBasicComponent from './basic.component';

import { RadioModule } from '@alauda/ui';

const meta: Meta<RadioBasicComponent> = {
  title: 'Example/Radio',
  component: RadioBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [RadioBasicComponent],
      imports: [FormsModule, RadioModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<RadioBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    plain: false,
    disabled: false,
    direction: 'row',
    size: 'medium',
  },
};
