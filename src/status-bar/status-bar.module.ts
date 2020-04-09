import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipModule } from '../tooltip/public-api';

import { StatusBarComponent } from './status-bar.component';

@NgModule({
  imports: [CommonModule, TooltipModule],
  declarations: [StatusBarComponent],
  exports: [StatusBarComponent],
})
export class StatusBarModule {}
