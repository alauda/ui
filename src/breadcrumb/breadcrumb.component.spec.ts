import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BreadcrumbModule } from './breadcrumb.module';

describe('BreadcrumbComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BreadcrumbModule, TestComponent],
    });
  });

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
  standalone: true,
  imports: [BreadcrumbModule],
})
class TestComponent {}
