import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <button
      aui-button="primary"
      [plain]="true"
      [auiDropdown]="menu"
    >
      dropdown
      <aui-icon icon="angle_down"></aui-icon>
    </button>
    <ng-template #menu>
      <aui-menu>
        <aui-menu-item>操作一</aui-menu-item>
        <aui-menu-item>操作二</aui-menu-item>
        <aui-submenu>
          子菜单
          <aui-menu-item>操作三</aui-menu-item>
          <aui-menu-item>操作四</aui-menu-item>
          <aui-menu-item>操作五</aui-menu-item>
        </aui-submenu>
      </aui-menu>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class DropdownSubmenuComponent {}
