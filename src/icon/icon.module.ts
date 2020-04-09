import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ICON_REGISTRY_SERVICE_PROVIDER } from './icon-registry.service';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IconComponent],
  exports: [IconComponent],
  providers: [ICON_REGISTRY_SERVICE_PROVIDER],
})
export class IconModule {}
