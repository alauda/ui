import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-tag
      type="primary"
      [border]="true"
      size="mini"
    >
      <aui-icon
        icon="exclamation_circle_s"
        background="circle"
      ></aui-icon>
      primary</aui-tag
    >
    <aui-tag
      type="success"
      [border]="true"
      size="mini"
      ><aui-icon
        icon="exclamation_circle_s"
        background="circle"
      ></aui-icon>
      success</aui-tag
    >
    <aui-tag
      type="warning"
      [border]="true"
      size="mini"
      ><aui-icon
        icon="exclamation_circle_s"
        background="circle"
      ></aui-icon>
      warning</aui-tag
    >
    <aui-tag
      type="error"
      [border]="true"
      size="mini"
      ><aui-icon
        icon="exclamation_circle_s"
        background="circle"
      ></aui-icon>
      error</aui-tag
    >
    <aui-tag
      type="info"
      [border]="true"
      size="mini"
      ><aui-icon
        icon="exclamation_circle_s"
        background="circle"
      ></aui-icon>
      info</aui-tag
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class TagIconComponent {}
