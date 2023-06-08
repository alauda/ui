import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { paginatorEnComponent } from './paginator-en.component';

import { PaginatorModule } from '@alauda/ui';

const meta: Meta<paginatorEnComponent> = {
  title: 'Example/Paginator',
  component: paginatorEnComponent,
  decorators: [
    moduleMetadata({
      declarations: [paginatorEnComponent],
      imports: [PaginatorModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<paginatorEnComponent>;

export const Paginator_en: Story = {
  name: 'english',
  args: {
    currentPage: 1,
    pageSize: 20,
    total: 350,
    pageSizeOptions: ['10', '20', '50'],
  },
};
