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
    <ng-template
      #menu
      let-canDelete="canDelete"
    >
      <aui-menu>
        <aui-menu-item>创建</aui-menu-item>
        <aui-menu-item>更新</aui-menu-item>
        <aui-menu-item *ngIf="canDelete">删除</aui-menu-item>
      </aui-menu>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class DropdownTemplateComponent {}
