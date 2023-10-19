import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon';

import { ButtonGroupComponent } from './button-group/button-group.component';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule, IconModule, ButtonComponent, ButtonGroupComponent],
  exports: [ButtonComponent, ButtonGroupComponent],
})
export class ButtonModule {}
