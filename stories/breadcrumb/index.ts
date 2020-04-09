import { BreadcrumbModule } from '@alauda/ui';
import { storiesOf } from '@storybook/angular';

storiesOf('Breadcrumb', module).add('breadcrumb', () => {
  return {
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
  };
});
