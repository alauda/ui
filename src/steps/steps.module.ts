import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../public-api';

import { StepsComponent } from './steps.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [StepsComponent],
  exports: [StepsComponent],
})
export class StepsModule {}
