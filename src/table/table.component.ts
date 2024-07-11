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
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { buildBem } from '../internal/utils';

import {
  TablePlaceholderDefDirective,
  TablePlaceholderOutletDirective,
} from './table-placeholder.directive';

export const tableBem = buildBem('aui-table');

@Component({
  selector: 'aui-table',
  exportAs: 'auiTable',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['table.component.scss', 'table-scroll.scss'],
  template:
    CDK_TABLE_TEMPLATE +
    '<ng-container auiTablePlaceholderOutlet></ng-container>',
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

  @HostBinding('class')
  className = tableBem.block();

  elementRef = inject(ElementRef);

  // FIXME: workaround to override because it will break constructor if it is field, but why MatTable works?
  // @ts-expect-error workaround to override because it will break constructor if it is field
  protected get stickyCssClass() {
    return 'aui-table-sticky';
  }

  protected override set stickyCssClass(_: string) {
    // nothing
  }

  override ngAfterContentInit() {
    super.ngAfterContentInit();
    this._createPlaceholder();
  }

  private _createPlaceholder() {
    const footerRow = this._placeholderDef;
    if (!footerRow) {
      return;
    }

    this._placeholderOutlet.viewContainer.createEmbeddedView(
      footerRow.templateRef,
    );
  }

  private _clearPlaceholder() {
    this._placeholderOutlet.viewContainer.clear();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this._clearPlaceholder();
  }
}
