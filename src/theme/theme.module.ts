import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemePickerPipe } from './theme.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ThemePickerPipe],
  exports: [ThemePickerPipe],
})
export class ThemeModule {}
