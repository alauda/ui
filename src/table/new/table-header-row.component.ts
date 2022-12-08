import { CDK_ROW_TEMPLATE, CdkHeaderRow } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

/** Header template container that contains the cell outlet. Adds the right class and role. */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[auiTableHeaderRow]',
  template: CDK_ROW_TEMPLATE,
  host: {
    class: 'aui-table__header-row',
    role: 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'auiTableHeaderRow',
  preserveWhitespaces: false,
})
export class NewTableHeaderRowComponent extends CdkHeaderRow {}
