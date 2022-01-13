import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '../button/public-api';
import { I18nModule } from '../i18n/public-api';
import { IconModule } from '../icon/public-api';
import { InputModule } from '../input/public-api';
import { TooltipModule } from '../tooltip/public-api';

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
