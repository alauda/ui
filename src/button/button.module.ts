import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/public-api';

import { ButtonGroupComponent } from './button-group/button-group.component';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [ButtonComponent, ButtonGroupComponent],
  exports: [ButtonComponent, ButtonGroupComponent],
})
export class ButtonModule {}
