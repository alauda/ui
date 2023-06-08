import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { AutoSizeComponent } from './auto-size.component';

import { InputModule } from '@alauda/ui';

const meta: Meta<AutoSizeComponent> = {
  title: 'Example/Input',
  component: AutoSizeComponent,
  decorators: [
    moduleMetadata({
      declarations: [AutoSizeComponent],
      imports: [InputModule, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<AutoSizeComponent>;

export const AutoSize: Story = {
  name: 'autosize',
};
