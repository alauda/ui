import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <button
      aui-button="primary"
      [plain]="true"
      [auiDropdown]="menu"
      [auiDropdownContext]="{ canDelete: false }"
    >
      dropdown 1
      <aui-icon icon="angle_down"></aui-icon>
    </button>
    <button
      aui-button="primary"
      [plain]="true"
      [auiDropdown]="menu"
      [auiDropdownContext]="{ canDelete: true }"
    >
      dropdown 2
      <aui-icon icon="angle_down"></aui-icon>
    </button>
    <aui-menu #menu>
      <ng-template
        auiMenuContent
        let-canDelete="canDelete"
      >
        <aui-menu-item>创建</aui-menu-item>
        <aui-menu-item>更新</aui-menu-item>
        <aui-menu-item *ngIf="canDelete">删除</aui-menu-item>
      </ng-template>
    </aui-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DropdownTemplateComponent {}
