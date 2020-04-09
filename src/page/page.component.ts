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
  @ContentChild(PageHeaderDirective, { read: TemplateRef, static: true })
  pageHeader: TemplateRef<any>;

  @ContentChild(PageContentDirective, { read: TemplateRef, static: false })
  pageContent: TemplateRef<any>;

  @ContentChild(PageSiderDirective, { read: TemplateRef, static: true })
  pageSider: TemplateRef<any>;

  @ContentChild(PageToolbarDirective, { read: TemplateRef, static: false })
  pageToolbar: TemplateRef<any>;

  @ContentChildren(PageSnackbarDirective, {
    read: TemplateRef,
    descendants: true,
  })
  pageSnackbars: QueryList<TemplateRef<any>>;
}
