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
  CdkTableModule,
} from '@angular/cdk/table';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import {
  TablePlaceholderDefDirective,
  TablePlaceholderOutletDirective,
} from './table-placeholder.directive';

@Component({
  selector: 'aui-table',
  exportAs: 'auiTable',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['table.component.scss', 'table-scroll.scss'],
  template:
    CDK_TABLE_TEMPLATE +
    '<ng-container auiTablePlaceholderOutlet></ng-container>',
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
  standalone: true,
  imports: [CdkTableModule, TablePlaceholderOutletDirective],
})
export class TableComponent<T>
  extends CdkTable<T>
  implements AfterContentInit, OnDestroy
{
  @Input()
  enableScrollWrapper: boolean;

  @ViewChild(TablePlaceholderOutletDirective, { static: true })
  _placeholderOutlet: TablePlaceholderOutletDirective;

  @ContentChild(TablePlaceholderDefDirective, { static: true })
  _placeholderDef: TablePlaceholderDefDirective;

  // FIXME: workaround to override because it will break constructor if it is field, but why MatTable works?
  // @ts-ignore
  protected get stickyCssClass() {
    return 'aui-table-sticky';
  }

  protected override set stickyCssClass(_: string) {
    // nothing
  }

  ngAfterContentInit() {
    this._createPlaceholder();
  }

  private _createPlaceholder() {
    const footerRow = this._placeholderDef;
    if (!this._placeholderDef) {
      return;
    }

    const container = this._placeholderOutlet.viewContainer;
    container.createEmbeddedView(footerRow.templateRef);
  }

  private _clearPlaceholder() {
    this._placeholderOutlet.viewContainer.clear();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this._clearPlaceholder();
  }
}
