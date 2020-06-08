import { Component } from '@angular/core';

@Component({
  templateUrl: './template.html',
})
export class IndeterminateCheckboxComponent {
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
