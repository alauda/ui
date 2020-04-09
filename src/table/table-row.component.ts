import { CDK_ROW_TEMPLATE, CdkRow } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'aui-table-row',
  template: CDK_ROW_TEMPLATE,
  host: {
    class: 'aui-table__row',
    role: 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'auiTableRow',
  preserveWhitespaces: false,
})
export class TableRowComponent extends CdkRow {
  @Input()
  @HostBinding('class.isDisabled')
  disabled = false;
}
