import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SelectModule } from 'src/select';

@Component({
  standalone: true,
  imports: [SelectModule, FormsModule, NgFor],
  selector: 'story-select-basic',
  template: `
    <aui-select
      [(ngModel)]="value"
      [loading]="loading"
      [disabled]="disabled"
      [clearable]="clearable"
      [filterable]="filterable"
      [readonly]="readonly"
      placeholder="select a value"
    >
      <ng-container *auiOptionContent>
        <aui-option
          *ngFor="let option of arr"
          [value]="option"
          [disabled]="option === 'option5'"
        >
          {{ option }}
        </aui-option>
      </ng-container>
      <aui-option-placeholder>Empty</aui-option-placeholder>
    </aui-select>
    <br />
    <br />
    value: {{ value }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectBasicComponent {
  /**
   * 是否加载中
   */
  @Input()
  loading = false;

  /**
   * 是否禁用
   */
  @Input()
  disabled = false;

  /**
   * 选项是否可清除
   */
  @Input()
  clearable = false;

  /**
   * 是否支持选项过滤
   */
  @Input()
  filterable = true;

  /**
   * 是否只读
   */
  @Input()
  readonly = false;

  arr = Array.from({ length: 11 })
    .fill(null)
    .map((_, i) => `option${i + 1}`);

  value = 'option1';
}
