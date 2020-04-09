import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  PageContentDirective,
  PageHeaderDirective,
  PageSiderDirective,
  PageSnackbarDirective,
  PageToolbarDirective,
} from './helper-directives';
import { PageComponent } from './page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    PageComponent,
    PageHeaderDirective,
    PageContentDirective,
    PageSiderDirective,
    PageToolbarDirective,
    PageSnackbarDirective,
  ],
  exports: [
    PageComponent,
    PageHeaderDirective,
    PageContentDirective,
    PageSiderDirective,
    PageToolbarDirective,
    PageSnackbarDirective,
  ],
})
export class PageModule {}
