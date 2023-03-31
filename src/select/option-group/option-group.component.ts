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
import { Observable, combineLatest, of, map, startWith, switchMap } from 'rxjs';

import { publishRef } from '../../utils';
import { OptionGroupTitleDirective } from '../helper-directives';
import { OptionComponent } from '../option.component';

@Component({
  selector: 'aui-option-group',
  templateUrl: './option-group.component.html',
  styleUrls: ['./option-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class OptionGroupComponent<T> implements AfterContentInit {
  @ContentChildren(forwardRef(() => OptionComponent))
  options: QueryList<OptionComponent<T>>;

  @ContentChild(OptionGroupTitleDirective, { read: ElementRef })
  groupTitle: ElementRef;

  hasVisibleOption$: Observable<boolean>;

  ngAfterContentInit() {
    this.hasVisibleOption$ = this.options.changes.pipe(
      startWith(this.options),
      switchMap((options: QueryList<OptionComponent<T>>) =>
        options.length > 0
          ? combineLatest(
              options.map(node => {
                node.groupTitle = this.groupTitle;
                return node.changes;
              }),
            )
          : of([false]),
      ),
      map(options => !!options.length),
      publishRef(),
    );
  }
}
