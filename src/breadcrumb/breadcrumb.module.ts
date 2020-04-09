import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/public-api';

import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [BreadcrumbComponent, BreadcrumbItemComponent],
  exports: [BreadcrumbComponent, BreadcrumbItemComponent],
})
export class BreadcrumbModule {}
