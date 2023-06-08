import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { IconListComponent } from './list.component';

import { ButtonModule, IconModule } from '@alauda/ui';

const meta: Meta<IconListComponent> = {
  title: 'Example/Icon',
  component: IconListComponent,
  decorators: [
    moduleMetadata({
      declarations: [IconListComponent],
      imports: [IconModule, ButtonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<IconListComponent>;

export const List: Story = {
  name: 'Icon List',
};
