import { AsyncPipe } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { Observable, combineLatest, of, map, startWith, switchMap } from 'rxjs';

import { publishRef } from '../../internal/utils';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'aui-option-group',
  templateUrl: './option-group.component.html',
  styleUrls: ['./option-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  imports: [AsyncPipe],
})
export class OptionGroupComponent<T> implements AfterContentInit {
  @ContentChildren(forwardRef(() => OptionComponent))
  options: QueryList<OptionComponent<T>>;

  hasVisibleOption$: Observable<boolean>;

  ngAfterContentInit() {
    this.hasVisibleOption$ = this.options.changes.pipe(
      startWith(this.options),
      switchMap((options: QueryList<OptionComponent<T>>) =>
        options.length > 0
          ? combineLatest(options.map(node => node.visible$))
          : of([false]),
      ),
      map(visible => visible.some(Boolean)),
      publishRef(),
    );
  }
}
