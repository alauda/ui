import { Injectable } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Subject } from 'rxjs';

import { paginatorComponent } from './paginator.component';

import { PaginatorIntl, PaginatorModule } from '@alauda/ui';

@Injectable()
export class PaginatorZh extends PaginatorIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  override readonly changes: Subject<void> = new Subject<void>();

  /** A label for the page size selector. */
  override itemsPerPageLabel = '条/页';

  override jumperLabelPrefix = '前往';

  override jumperLabelSuffix = '页';

  override getTotalLabel = (length: number) => `共 ${length} 条`;
}

const meta: Meta<paginatorComponent> = {
  title: 'Example/Paginator',
  component: paginatorComponent,
  decorators: [
    moduleMetadata({
      declarations: [paginatorComponent],
      imports: [BrowserAnimationsModule, PaginatorModule],
      providers: [
        {
          provide: PaginatorIntl,
          useClass: PaginatorZh,
        },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<paginatorComponent>;

export const Paginator_zh: Story = {
  name: 'chinese',
  args: {
    layout: 'total,pager,sizes,jumper,content',
    currentPage: 1,
    pageSize: 20,
    total: 350,
    pageSizeOptions: ['10', '20', '50'],
    disabled: false,
  },
};
