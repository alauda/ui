import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon';

import { StepsComponent } from './steps.component';

@NgModule({
  imports: [CommonModule, IconModule, StepsComponent],
  exports: [StepsComponent],
})
export class StepsModule {}
