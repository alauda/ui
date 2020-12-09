import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import {
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'aui-option-group',
  templateUrl: './option-group.component.html',
  styleUrls: ['./option-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class OptionGroupComponent implements AfterContentInit {
  @ContentChildren(forwardRef(() => OptionComponent))
  options: QueryList<OptionComponent>;

  hasVisibleOption$: Observable<boolean>;

  ngAfterContentInit() {
    this.hasVisibleOption$ = (this.options.changes as Observable<
      QueryList<OptionComponent>
    >).pipe(
      startWith(this.options),
      switchMap(options => {
        return options.length > 0
          ? combineLatest(options.map(node => node.visible$))
          : of([false]);
      }),
      map(values => values.some(value => !!value)),
      publishReplay(1),
      refCount(),
    );
  }
}
