import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    template: `
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class BreadcrumbComponent {}
