import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/public-api';

import { CheckTagComponent } from './check-tag/check-tag.component';
import { TagComponent } from './tag.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [TagComponent, CheckTagComponent],
  exports: [TagComponent, CheckTagComponent],
})
export class TagModule {}
