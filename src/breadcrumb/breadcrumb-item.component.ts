import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'aui-breadcrumb-item',
    templateUrl: './breadcrumb-item.component.html',
    styleUrls: ['./breadcrumb-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    imports: [NgIf, IconComponent]
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
