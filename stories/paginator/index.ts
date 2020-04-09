import { ComponentSize, PaginatorIntl, PaginatorModule } from '@alauda/ui';
import { Injectable } from '@angular/core';
import {
  array,
  boolean,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { Subject } from 'rxjs';

storiesOf('Paginator', module)
  .addDecorator(withKnobs)
  .add('chinese', () => {
    const layout = text('layout', 'total,pager,sizes,jumper,content');
    const sizeOptions = {
      [ComponentSize.Medium]: ComponentSize.Medium,
      [ComponentSize.Small]: ComponentSize.Small,
      [ComponentSize.Mini]: ComponentSize.Mini,
    };
    const size = select('size', sizeOptions, ComponentSize.Medium);
    const currentPage = number('currentPage', 1);
    const pageSize = number('pageSize', 20);
    const total = number('total', 350);
    const pageSizeOptions = array('pageSizeOptions', [10, 20, 50] as any); // FIXME: 移除 as any, array 类型声明错误
    const disabled = boolean('disabled', false);

    return {
      moduleMetadata: {
        imports: [PaginatorModule],
        providers: [
          {
            provide: PaginatorIntl,
            useClass: PaginatorZh,
          },
        ],
      },
      template: /* HTML */ `
        <aui-paginator
          [layout]="layout"
          [size]="size"
          [(currentPage)]="currentPage"
          [(pageSize)]="pageSize"
          [total]="total"
          [pageSizeOptions]="pageSizeOptions"
          [disabled]="disabled"
        >
          custom content
        </aui-paginator>
      `,
      props: {
        layout,
        size,
        currentPage,
        pageSize,
        total,
        pageSizeOptions,
        disabled,
      },
    };
  })
  .add('english', () => {
    const currentPage = number('currentPage', 1);
    const pageSize = number('pageSize', 20);
    const total = number('total', 150);
    const pageSizeOptions = array('pageSizeOptions', [10, 20, 50] as any); // FIXME: 移除 as any, array 类型声明错误

    return {
      moduleMetadata: {
        imports: [PaginatorModule],
      },
      template: /* HTML */ `
        <aui-paginator
          layout="total,pager,sizes,jumper"
          [(currentPage)]="currentPage"
          [(pageSize)]="pageSize"
          [total]="total"
          [pageSizeOptions]="pageSizeOptions"
        ></aui-paginator>
      `,
      props: {
        currentPage,
        pageSize,
        total,
        pageSizeOptions,
      },
    };
  });

@Injectable()
export class PaginatorZh extends PaginatorIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** A label for the page size selector. */
  itemsPerPageLabel = '条/页';

  jumperLabelPrefix = '前往';

  jumperLabelSuffix = '页';

  getTotalLabel = (length: number) => {
    return `共 ${length} 条`;
  };
}
