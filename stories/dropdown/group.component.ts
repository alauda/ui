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
        <aui-menu-group>
          <span auiMenuGroupTitle>分组一</span>
          <aui-menu-item>操作一</aui-menu-item>
          <aui-menu-item>操作二</aui-menu-item>
        </aui-menu-group>
        <aui-menu-group>
          <span auiMenuGroupTitle>分组二</span>
          <aui-menu-item>操作三</aui-menu-item>
          <aui-menu-item>操作四</aui-menu-item>
        </aui-menu-group>
        <aui-menu-group>
          <aui-menu-item>操作五</aui-menu-item>
          <aui-menu-item>操作六</aui-menu-item>
        </aui-menu-group>
      </aui-menu>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class DropdownGroupComponent {}
