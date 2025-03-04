import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'story-paginator-en',
    template: `
    <aui-paginator
      layout="total,pager,sizes,jumper"
      [(currentPage)]="currentPage"
      [(pageSize)]="pageSize"
      [total]="total"
      [pageSizeOptions]="pageSizeOptions"
    ></aui-paginator>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class paginatorEnComponent {
  @Input()
  currentPage = 1;

  @Input()
  pageSize = 20;

  @Input()
  total = 150;

  @Input()
  pageSizeOptions = ['10', '20', '50'];
}
