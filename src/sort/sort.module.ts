import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SortHeaderComponent } from './sort-header.component';
import { SortDirective } from './sort.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SortDirective, SortHeaderComponent],
  exports: [SortDirective, SortHeaderComponent],
})
export class SortModule {}
