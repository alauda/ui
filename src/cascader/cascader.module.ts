import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon';

import { CascaderComponent } from './cascader.component';
import { CascaderOptionComponent } from './option/option.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    CascaderComponent,
    CascaderOptionComponent,
  ],
  exports: [CascaderComponent, CascaderOptionComponent],
})
export class CascaderModule {}
