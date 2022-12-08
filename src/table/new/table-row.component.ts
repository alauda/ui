import { CDK_ROW_TEMPLATE, CdkRow } from '@angular/cdk/table';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[auiTableRow]',
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
export class NewTableRowComponent extends CdkRow implements AfterContentInit {
  @Input()
  @HostBinding('class.isDisabled')
  disabled = false;

  @HostBinding('class.hasPanel')
  hasPanel = false;

  constructor(private readonly elRef: ElementRef<HTMLElement>) {
    super();
  }

  ngAfterContentInit() {
    const panel = this.elRef.nativeElement.querySelector(
      '[auiTableCell][auiExpandPanel]',
    );
    this.hasPanel = !!panel;
  }
}
