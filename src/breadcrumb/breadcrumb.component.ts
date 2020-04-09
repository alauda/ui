import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';

import { BreadcrumbItemComponent } from './breadcrumb-item.component';

@Component({
  selector: 'aui-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class BreadcrumbComponent implements AfterContentInit {
  @Input()
  get separator() {
    return this._separator;
  }

  set separator(val) {
    if (val === this._separator) {
      return;
    }
    this._separator = val;
    if (this.items) {
      this.items.forEach(item => {
        item.separator = val;
      });
    }
  }

  @Input()
  get separatorIcon() {
    return this._separatorIcon;
  }

  set separatorIcon(val) {
    if (val === this._separatorIcon) {
      return;
    }
    this._separatorIcon = val;
    if (this.items) {
      this.items.forEach(item => {
        item.separatorIcon = val;
      });
    }
  }

  @ContentChildren(BreadcrumbItemComponent)
  items: QueryList<BreadcrumbItemComponent>;

  private _separator = '/';
  private _separatorIcon = '';

  ngAfterContentInit() {
    this.items.forEach(item => {
      item.separator = this.separator;
      item.separatorIcon = this.separatorIcon;
    });
  }
}
