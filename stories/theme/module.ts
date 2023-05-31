import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomizeComponent } from './customize/component';
import { PaletteComponent } from './palette/component';

import {
  ButtonModule,
  ColorPickerModule,
  FormModule,
  IconModule,
  InputModule,
  TooltipModule,
} from '@alauda/ui';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    ColorPickerModule,
    IconModule,
    InputModule,
    FormModule,
    TooltipModule,
  ],
  declarations: [PaletteComponent, CustomizeComponent],
  exports: [PaletteComponent, CustomizeComponent],
})
export class ThemeModule {}
