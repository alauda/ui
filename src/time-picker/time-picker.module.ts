import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '../button';
import { I18nModule } from '../i18n';
import { IconModule } from '../icon';
import { InputModule } from '../input';
import { TooltipModule } from '../tooltip';

import { TimePickerComponent } from './component';
import { TimePickerPanelComponent } from './panel/panel.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PortalModule,
    OverlayModule,
    CommonModule,
    InputModule,
    TooltipModule,
    IconModule,
    ButtonModule,
    I18nModule,
  ],
  declarations: [TimePickerComponent, TimePickerPanelComponent],
  exports: [TimePickerComponent, TimePickerPanelComponent],
})
export class TimePickerModule {}
