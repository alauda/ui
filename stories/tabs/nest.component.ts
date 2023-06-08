import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-form-item>
      <label auiFormItemLabel>启用 Lazy</label>
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
        <tabs-active-test *auiTabContent
          ><aui-card>Content 1</aui-card></tabs-active-test
        >
      </aui-tab>
      <aui-tab label="Tab 2">
        <tabs-active-test *auiTabContent>
          <aui-tab-group [lazy]="true">
            <aui-tab label="Tab 2-1">
              <tabs-active-test *auiTabContent>
                <aui-card> Content 2-1 </aui-card>
              </tabs-active-test>
            </aui-tab>
            <aui-tab label="Tab 2-2">
              <tabs-active-test *auiTabContent>
                <aui-card> Content 2-2 </aui-card>
              </tabs-active-test>
            </aui-tab>
          </aui-tab-group>
        </tabs-active-test>
      </aui-tab>
    </aui-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TabsNestComponent {
  lazy = true;
}
