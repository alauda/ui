import {
  _DisposeViewRepeaterStrategy,
  _VIEW_REPEATER_STRATEGY,
} from '@angular/cdk/collections';
import {
  CDK_TABLE,
  CDK_TABLE_TEMPLATE,
  CdkTable,
  _COALESCED_STYLE_SCHEDULER,
  _CoalescedStyleScheduler,
} from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'aui-table',
  exportAs: 'auiTable',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['table.component.scss'],
  template: CDK_TABLE_TEMPLATE,
  host: {
    class: 'aui-table',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CDK_TABLE,
      useExisting: TableComponent,
    },
    {
      provide: _VIEW_REPEATER_STRATEGY,
      useClass: _DisposeViewRepeaterStrategy,
    },
    {
      provide: _COALESCED_STYLE_SCHEDULER,
      useClass: _CoalescedStyleScheduler,
    },
  ],
})
export class TableComponent<T> extends CdkTable<T> {
  protected stickyCssClass = 'aui-table-sticky';
}
