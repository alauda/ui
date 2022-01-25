import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CssVarPipe, RgbColorPipe, RgbaColorPipe } from './color.pipe';
import { ThemePickerPipe } from './theme-picker.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ThemePickerPipe, RgbColorPipe, RgbaColorPipe, CssVarPipe],
  exports: [ThemePickerPipe, RgbColorPipe, RgbaColorPipe, CssVarPipe],
})
export class ThemeModule {}
