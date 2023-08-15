import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipModule } from '../tooltip';

import { StatusBarComponent } from './status-bar.component';

@NgModule({
  imports: [CommonModule, TooltipModule, StatusBarComponent],
  exports: [StatusBarComponent],
})
export class StatusBarModule {}
