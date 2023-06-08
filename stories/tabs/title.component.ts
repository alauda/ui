import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-tab-group size="large">
      <ng-container *auiTabTitle>Title</ng-container>
      <aui-tab label="Tab 0"> <aui-card> Content 1 </aui-card> </aui-tab>
      <aui-tab label="Tab 1"><aui-card> Content 2 </aui-card></aui-tab>
      <aui-tab label="Tab 2"><aui-card> Content 3 </aui-card></aui-tab>
      <aui-tab label="Tab 3"><aui-card> Content 4 </aui-card></aui-tab>
    </aui-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TabsTitleComponent {}
