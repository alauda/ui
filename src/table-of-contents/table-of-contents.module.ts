import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TocContainerDirective } from './toc-container.directive';
import { TocContentDirective } from './toc-content.directive';
import { TocLinkDirective } from './toc-link.directive';

@NgModule({
  imports: [
    CommonModule,
    TocContentDirective,
    TocContainerDirective,
    TocLinkDirective,
  ],
  exports: [TocContentDirective, TocContainerDirective, TocLinkDirective],
})
export class TableOfContentsModule {}
