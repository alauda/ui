import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon';

import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    CheckboxComponent,
    CheckboxGroupComponent,
  ],
  exports: [CheckboxComponent, CheckboxGroupComponent],
})
export class CheckboxModule {}

export const CHECKBOX_MODULE = [
  CheckboxComponent,
  CheckboxGroupComponent,
] as const;
