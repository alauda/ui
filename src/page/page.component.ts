import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import {
  PageContentDirective,
  PageHeaderDirective,
  PageSiderDirective,
  PageSnackbarDirective,
  PageToolbarDirective,
} from './helper-directives';

@Component({
  selector: 'aui-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class PageComponent {
  @ContentChild(PageHeaderDirective, { read: TemplateRef })
  pageHeader: TemplateRef<any>;

  @ContentChild(PageContentDirective, { read: TemplateRef })
  pageContent: TemplateRef<any>;

  @ContentChild(PageSiderDirective, { read: TemplateRef })
  pageSider: TemplateRef<any>;

  @ContentChild(PageToolbarDirective, { read: TemplateRef })
  pageToolbar: TemplateRef<any>;

  @ContentChildren(PageSnackbarDirective, {
    read: TemplateRef,
    descendants: true,
  })
  pageSnackbars: QueryList<TemplateRef<any>>;
}
