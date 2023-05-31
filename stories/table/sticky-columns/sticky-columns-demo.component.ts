import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sticky-columns-table-demo',
  templateUrl: 'sticky-columns-demo.component.html',
  styleUrls: ['sticky-columns-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyColumnsDemoComponent {
  columns = ['no'].concat(
    Array.from({ length: 13 }).map((_, index) => `cell${index + 1}`),
  );

  dataSource: string[][] = this._mockData();

  private _mockData() {
    return Array.from({ length: 6 }).map((_, i) =>
      ['1'].concat(Array.from({ length: 13 }).map((_, j) => `cell${i}${j}`)),
    );
  }

  clear() {
    this.dataSource = [];
  }

  reset() {
    if (!this.dataSource.length) {
      this.dataSource = this._mockData();
    }
  }
}
