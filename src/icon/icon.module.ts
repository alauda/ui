import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../theme';

import { IconComponent } from './icon.component';

@NgModule({
  imports: [CommonModule, ThemeModule, IconComponent],
  exports: [IconComponent],
})
export class IconModule {}
