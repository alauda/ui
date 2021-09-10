import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemePipe } from './theme.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ThemePipe],
  exports: [ThemePipe],
})
export class ThemeModule {}
