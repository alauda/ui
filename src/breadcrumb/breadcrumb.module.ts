import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon';
import { SharedModule } from '../shared/shared.module';

import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  imports: [CommonModule, IconModule, SharedModule],
  declarations: [BreadcrumbComponent, BreadcrumbItemComponent],
  exports: [BreadcrumbComponent, BreadcrumbItemComponent],
})
export class BreadcrumbModule {}
