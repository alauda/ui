import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-dropdown-button type="primary">
      dropdown button
      <aui-menu>
        <aui-menu-item>操作一</aui-menu-item>
        <aui-menu-item>操作二</aui-menu-item>
        <aui-menu-item>操作三</aui-menu-item>
        <aui-menu-item>操作四</aui-menu-item>
      </aui-menu>
    </aui-dropdown-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DropdownButtonComponent {}
