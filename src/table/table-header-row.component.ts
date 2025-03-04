import {
  CDK_ROW_TEMPLATE,
  CdkHeaderRow,
  CdkTableModule,
} from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

/** Header template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'aui-table-header-row',
    template: CDK_ROW_TEMPLATE,
    host: {
        class: 'aui-table__header-row',
        role: 'row',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'auiTableHeaderRow',
    preserveWhitespaces: false,
    imports: [CdkTableModule]
})
export class TableHeaderRowComponent extends CdkHeaderRow {}
