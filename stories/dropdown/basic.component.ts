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
    <aui-menu #menu>
      <aui-menu-item>默认按钮</aui-menu-item>
      <aui-menu-item type="success">成功按钮</aui-menu-item>
      <aui-menu-item type="warning">警告按钮</aui-menu-item>
      <aui-menu-item type="danger">危险按钮</aui-menu-item>
      <aui-menu-item [disabled]="true">禁用按钮</aui-menu-item>
    </aui-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DropdownBasicComponent {}
