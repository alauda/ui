import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  CssVarPipe,
  RgbColorPipe,
  RgbaColorPipe,
  ThemePickerPipe,
} from './theme.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ThemePickerPipe, RgbColorPipe, RgbaColorPipe, CssVarPipe],
  exports: [ThemePickerPipe, RgbColorPipe, RgbaColorPipe, CssVarPipe],
})
export class ThemeModule {}
