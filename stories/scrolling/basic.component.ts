import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-form-item>
      <label auiFormItemLabel>启用虚拟滚动</label>
      <aui-radio-group [(ngModel)]="enabled">
        <aui-radio-button [value]="true">是</aui-radio-button>
        <aui-radio-button [value]="false">
          否（点击生效前会很卡）
        </aui-radio-button>
      </aui-radio-group>
    </aui-form-item>
    <aui-virtual-scroll-viewport
      *ngIf="enabled"
      itemSize="50"
      class="example-viewport"
    >
      <div
        *auiVirtualFor="let item of items"
        class="example-item"
      >
        {{ item }}
      </div>
    </aui-virtual-scroll-viewport>
    <div
      *ngIf="!enabled"
      class="example-viewport"
    >
      <div
        *ngFor="let item of items"
        class="example-item"
      >
        {{ item }}
      </div>
    </div>
  `,
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class ScrollingBasicComponent {
  items = Array.from({ length: 100_000 }).map((_, i) => `Item #${i}`);
  enabled = true;
}
