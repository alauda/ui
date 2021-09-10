import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../theme/public-api';

import { ICON_REGISTER_SERVICE_PROVIDER } from './icon-register.service';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [CommonModule, ThemeModule],
  declarations: [IconComponent],
  exports: [IconComponent],
  providers: [ICON_REGISTER_SERVICE_PROVIDER],
})
export class IconModule {}
