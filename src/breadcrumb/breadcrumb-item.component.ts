import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'aui-breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: ['./breadcrumb-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class BreadcrumbItemComponent {
  get separator() {
    return this._separator;
  }

  set separator(val) {
    this._separator = val;
    this.cdr.markForCheck();
  }

  get separatorIcon() {
    return this._separatorIcon;
  }

  set separatorIcon(val) {
    this._separatorIcon = val;
    this.cdr.markForCheck();
  }

  private _separator = '/';
  private _separatorIcon = '';

  constructor(private readonly cdr: ChangeDetectorRef) {}
}
