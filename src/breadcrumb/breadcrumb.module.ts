import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon';

import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
  ],
  exports: [BreadcrumbComponent, BreadcrumbItemComponent],
})
export class BreadcrumbModule {}
