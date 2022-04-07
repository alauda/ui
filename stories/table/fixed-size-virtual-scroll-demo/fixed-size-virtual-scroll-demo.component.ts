import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: 'fixed-size-virtual-scroll-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedSizeVirtualScrollDemoComponent {
  dataSource$$ = new BehaviorSubject(
    Array.from({ length: 50_000 }).map((_, i) => ({ id: i + 1 })),
  );
}
