import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'story-paginator-zh',
  template: `
    <aui-paginator
      [layout]="layout"
      [(currentPage)]="currentPage"
      [(pageSize)]="pageSize"
      [total]="total"
      [pageSizeOptions]="pageSizeOptions"
      [disabled]="disabled"
    >
      custom content
    </aui-paginator>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class paginatorComponent {
  @Input()
  layout = 'total,pager,sizes,jumper,content';

  @Input()
  currentPage = 1;

  @Input()
  pageSize = 20;

  @Input()
  total = 350;

  @Input()
  pageSizeOptions = ['10', '20', '50'];

  @Input()
  disabled = false;
}
