import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DemoComponent } from './components';
import { SortModule } from '@alauda/ui';

const meta: Meta = {
  title: 'Sort',
  component: DemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [DemoComponent],
      imports: [SortModule],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const sort: Story = {
  name: 'sort',
};
