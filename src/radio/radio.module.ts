import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon';

import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { RadioComponent } from './radio.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [RadioComponent, RadioGroupComponent, RadioButtonComponent],
  exports: [RadioComponent, RadioGroupComponent, RadioButtonComponent],
})
export class RadioModule {}
