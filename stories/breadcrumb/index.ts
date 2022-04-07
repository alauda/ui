import { storiesOf } from '@storybook/angular';

import { BreadcrumbModule } from '@alauda/ui';

storiesOf('Breadcrumb', module).add('breadcrumb', () => ({
  moduleMetadata: {
    imports: [BreadcrumbModule],
  },
  template: /* HTML */ `
    <aui-breadcrumb>
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
}));
