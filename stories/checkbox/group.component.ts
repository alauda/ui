import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'story-checkbox-group',
  template: `
    value: {{ model }}
    <br />
    <aui-checkbox
      label="label"
      [(ngModel)]="checkAll"
      [indeterminate]="indeterminate"
      (valueChange)="handleCheckAllChange($event)"
    >
      全选
    </aui-checkbox>
    <br />
    <aui-checkbox-group
      [(ngModel)]="model"
      (valueChange)="handleCheckBoxGroupChange($event)"
    >
      <aui-checkbox label="label1">选项一</aui-checkbox>
      <aui-checkbox label="label2">选项二</aui-checkbox>
      <aui-checkbox label="label3">选项三</aui-checkbox>
    </aui-checkbox-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class CheckboxGroupComponent {
  /**
   * 按钮横纵向排列方式
   */
  @Input()
  direction: 'column' | 'row' = 'row';

  model = ['label1'];
  checkAll = false;
  indeterminate = true;

  handleCheckAllChange(val: boolean) {
    this.model = val ? ['label1', 'label2', 'label3'] : [];
    this.indeterminate = false;
  }

  handleCheckBoxGroupChange(value: string[]) {
    const checkedCount = value.length;
    this.checkAll = checkedCount === 3;
    this.indeterminate = checkedCount > 0 && checkedCount < 3;
  }
}
