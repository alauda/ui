import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SwitchComponent } from './switch.component';

@NgModule({
  imports: [CommonModule, SwitchComponent],
  exports: [SwitchComponent],
})
export class SwitchModule {}
