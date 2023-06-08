import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-tab-group>
      <aui-tab
        *ngFor="let tab of tabs; index as i; count as len"
        [closeable]="len > 1"
        [label]="'tab' + tab"
        (close)="remove(i)"
      >
        <aui-card> content {{ i }} </aui-card>
      </aui-tab>
      <button
        *auiTabHeaderAddon
        aui-button="primary"
        (click)="add()"
        size="small"
        [square]="true"
      >
        <aui-icon icon="plus"></aui-icon>
      </button>
    </aui-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TabsEditableComponent {
  tabs = [1, 2, 3];

  add(num = 1) {
    this.tabs = this.tabs.concat(
      Array.from({ length: num })
        .fill('')
        .map((_, i) => this.tabs[this.tabs.length - 1] + i + 1),
    );
  }

  remove(index: number) {
    this.tabs.splice(index, 1);
  }
}
