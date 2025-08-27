import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { SearchInputComponent } from './search-input.component';

import { InputModule } from '@alauda/ui';

const meta: Meta<SearchInputComponent> = {
  title: 'Example/Input',
  component: SearchInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [SearchInputComponent],
      imports: [InputModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<SearchInputComponent>;

export const SearchInput: Story = {
  name: 'search input',
};
