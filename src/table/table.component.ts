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
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'aui-table',
  exportAs: 'auiTable',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['table.component.scss'],
  template: `<div
    class="aui-table__content"
    [auiTableScrollWrapper]="enableScrollWrapper"
  >
    ${CDK_TABLE_TEMPLATE}
  </div>`,
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
  @Input()
  enableScrollWrapper: boolean;

  // FIXME: workaround to override because it will break constructor if it is field, but why MatTable works?
  // @ts-expect-error
  protected get stickyCssClass() {
    return 'aui-table-sticky';
  }

  protected set stickyCssClass(_stickyCssClass: string) {
    //
  }
}
