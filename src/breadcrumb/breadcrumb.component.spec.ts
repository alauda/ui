import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BREADCRUMB_MODULE } from './breadcrumb.module';

describe('BreadcrumbComponent', () => {
  it('should render correct template', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

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
  imports: [...BREADCRUMB_MODULE],
})
class TestComponent {}
