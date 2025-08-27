import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TocBasicComponent from './basic.component';

import { TableOfContentsModule } from '@alauda/ui';

const meta: Meta<TocBasicComponent> = {
  title: 'Example/Table of contents',
  component: TocBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [TocBasicComponent],
      imports: [TableOfContentsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TocBasicComponent>;

export const Toc: Story = {
  name: 'Toc',
};
