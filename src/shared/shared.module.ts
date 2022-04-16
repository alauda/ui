import { NgModule } from '@angular/core';

import { ClickOutsideDirective } from './click-outside.directive';
import { E2eAttributeBindingDirective } from './e2e-attribute-binding.directive';

@NgModule({
  declarations: [ClickOutsideDirective, E2eAttributeBindingDirective],
  exports: [ClickOutsideDirective, E2eAttributeBindingDirective],
})
export class SharedModule {}
