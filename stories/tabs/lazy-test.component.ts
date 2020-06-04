import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line component-selector
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
