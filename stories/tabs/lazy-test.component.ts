import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, take } from 'rxjs';

@Component({
  selector: 'tabs-lazy-test',
  template: `
    <ng-content></ng-content>
    num: {{ num$ | async }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyTestComponent {
  num$ = interval(1000).pipe(take(100));
}
