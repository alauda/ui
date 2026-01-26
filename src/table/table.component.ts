import { CDK_TABLE, CdkTable, CdkTableModule } from '@angular/cdk/table';
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
  template: `
    <ng-content select="caption" />
    <ng-content select="colgroup, col" />

    <!--
      Unprojected content throws a hydration error so we need this to capture it.
      It gets removed on the client so it doesn't affect the layout.
    -->
    @if (_isServer) {
      <ng-content />
    }

    @if (_isNativeHtmlTable) {
      <thead role="rowgroup">
        <ng-container headerRowOutlet />
      </thead>
      <tbody
        class="mdc-data-table__content"
        role="rowgroup"
      >
        <ng-container rowOutlet />
        <ng-container noDataRowOutlet />
      </tbody>
      <tfoot role="rowgroup">
        <ng-container footerRowOutlet />
      </tfoot>
    } @else {
      <ng-container headerRowOutlet />
      <ng-container rowOutlet />
      <ng-container noDataRowOutlet />
      <ng-container footerRowOutlet />
    }
    <ng-container auiTablePlaceholderOutlet></ng-container>
  `,

  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CDK_TABLE,
      useExisting: TableComponent,
    },
  ],
  imports: [CdkTableModule],
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
    if (this._placeholderOutlet?.viewContainer) {
      this._placeholderOutlet.viewContainer.clear();
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this._clearPlaceholder();
  }
}
