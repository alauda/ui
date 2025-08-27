import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import BreadcrumbComponent from './breadcrumb.component';

import { BreadcrumbModule } from '@alauda/ui';

const meta: Meta<BreadcrumbComponent> = {
  title: 'Example/Breadcrumb',
  component: BreadcrumbComponent,
  render: args => ({ props: args }),
  decorators: [
    moduleMetadata({
      declarations: [BreadcrumbComponent],
      imports: [BreadcrumbModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;

export const breadcrumb: Story = {
  name: 'breadcrumb',
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<aui-breadcrumb>
    <aui-breadcrumb-item><a href="/">storybook</a></aui-breadcrumb-item>
    <aui-breadcrumb-item><a href="./">breadcrumb</a></aui-breadcrumb-item>
    <aui-breadcrumb-item>default</aui-breadcrumb-item>
</aui-breadcrumb>
<aui-breadcrumb separator="|">
    <aui-breadcrumb-item><a href="/">storybook</a></aui-breadcrumb-item>
    <aui-breadcrumb-item><a href="./">breadcrumb</a></aui-breadcrumb-item>
    <aui-breadcrumb-item>default</aui-breadcrumb-item>
</aui-breadcrumb>
<aui-breadcrumb separatorIcon="angle_right">
    <aui-breadcrumb-item><a href="/">storybook</a></aui-breadcrumb-item>
    <aui-breadcrumb-item><a href="./">breadcrumb</a></aui-breadcrumb-item>
    <aui-breadcrumb-item>default</aui-breadcrumb-item>
</aui-breadcrumb>
      `,
      },
    },
  },
};
