import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-form-item>
      <label auiFormItemLabel>启用</label>
      <aui-radio-group
        auiFormItemControl
        [(ngModel)]="lazy"
        [plain]="false"
      >
        <aui-radio-button [value]="true">是</aui-radio-button>
        <aui-radio-button [value]="false">否</aui-radio-button>
      </aui-radio-group>
    </aui-form-item>
    <aui-tab-group [lazy]="lazy">
      <aui-tab label="Tab 1">
        <tabs-lazy-test *auiTabContent
          ><aui-card> Content 1 </aui-card></tabs-lazy-test
        >
      </aui-tab>
      <aui-tab label="Tab 2">
        <tabs-lazy-test *auiTabContent
          ><aui-card> Content 2 </aui-card></tabs-lazy-test
        >
      </aui-tab>
      <aui-tab label="Tab 3">
        <tabs-lazy-test *auiTabContent
          ><aui-card> Content 3 </aui-card></tabs-lazy-test
        >
      </aui-tab>
    </aui-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TabsLazyComponent {
  tabs = Array.from({ length: 10 }).fill('');
  lazy = true;
}
