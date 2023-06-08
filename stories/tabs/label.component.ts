import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-tab-group>
      <ng-container *auiTabTitle>aa2</ng-container>
      <aui-tab>
        <ng-container *auiTabLabel>
          <aui-icon icon="sun"></aui-icon>
          Custom Label
        </ng-container>
        <aui-card> Content 1 </aui-card>
      </aui-tab>
      <aui-tab label="Tab 1"><aui-card>Content 2</aui-card></aui-tab>
      <aui-tab>
        <ng-container *auiTabLabel>
          <aui-icon icon="moon"></aui-icon>
          Custom Label
        </ng-container>
        <aui-card> Content 3 </aui-card>
      </aui-tab>
    </aui-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TabsLabelComponent {
  tab = Array.from({ length: 3 }).fill('');
}
