import { AsyncPipe } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
  forwardRef,
  ContentChild,
  ElementRef,
} from '@angular/core';
import { startWith } from 'rxjs';

import { OptionGroupTitleDirective } from '../helper-directives';
import { OptionComponent } from '../option.component';

@Component({
  selector: 'aui-option-group',
  templateUrl: './option-group.component.html',
  styleUrls: ['./option-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  standalone: true,
  imports: [AsyncPipe],
})
export class OptionGroupComponent<T> implements AfterContentInit {
  @ContentChildren(forwardRef(() => OptionComponent))
  options: QueryList<OptionComponent<T>>;

  @ContentChild(OptionGroupTitleDirective, { read: ElementRef })
  groupTitle: ElementRef;

  ngAfterContentInit() {
    this.options.changes.pipe(startWith(null)).subscribe(() => {
      this.options.forEach(node => {
        node.groupTitle = this.groupTitle;
      });
    });
  }
}
