import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: 'sticky-columns-demo.component.html',
  styleUrls: ['sticky-columns-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyColumnsDemoComponent {
  columns = ['no'].concat(
    Array.from({ length: 10 }).map((_, index) => `cell${index + 1}`),
  );

  dataSource = Array.from({ length: 20 }).map((_, i) =>
    ['1'].concat(Array.from({ length: 10 }).map((_, j) => `cell${i}${j}`)),
  );
}
