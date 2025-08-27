import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormItemComponent } from './form-item/form-item.component';
import { FormDirective } from './form.directive';
import {
  FormItemAddonDirective,
  FormItemControlDirective,
  FormItemErrorDirective,
  FormItemHintDirective,
  FormItemLabelDirective,
} from './helper-directives';

@NgModule({
  imports: [
    CommonModule,
    FormDirective,
    FormItemComponent,
    FormItemAddonDirective,
    FormItemErrorDirective,
    FormItemHintDirective,
    FormItemLabelDirective,
    FormItemControlDirective,
  ],
  exports: [
    FormDirective,
    FormItemComponent,
    FormItemAddonDirective,
    FormItemErrorDirective,
    FormItemHintDirective,
    FormItemLabelDirective,
    FormItemControlDirective,
  ],
})
export class FormModule {}

export const FORM_MODULE = [
  FormDirective,
  FormItemComponent,
  FormItemAddonDirective,
  FormItemErrorDirective,
  FormItemHintDirective,
  FormItemLabelDirective,
  FormItemControlDirective,
] as const;
