import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/public-api';

import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [CheckboxComponent, CheckboxGroupComponent],
  exports: [CheckboxComponent, CheckboxGroupComponent],
})
export class CheckboxModule {}
